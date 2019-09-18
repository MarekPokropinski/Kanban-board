from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Board, List, Task
from .serializers import *


class BoardView(generics.ListCreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class BoardDetailsView(generics.RetrieveDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardDetailsSerializer


class TaskView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithListSerializer


class CreateTaskView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithListSerializer


class ListView(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListWithBoardSerializer


    def delete(self, request, **kwargs):
        id = kwargs['pk']
        tasklist = List.objects.get(pk=id)
        response = super().delete(request,**kwargs)
        if response.status_code!=status.HTTP_204_NO_CONTENT:
            return response
        pos = tasklist.order + 1
        board = Board.objects.get(id=tasklist.board.id)

        while pos<board.lists_count:
            tasklist2 = List.objects.get(order=pos, board=board.id)
            tasklist2.order = pos-1
            tasklist2.save()
            pos+=1

        board.lists_count-=1
        board.save()
        return response




class MoveListView(generics.GenericAPIView):
    """
    Moves tasklist to the position
    accepts requests in form: 
    {
        "id": number,
        "destination": number
    }
    """
    queryset = List.objects.all()
    serializer_class = MoveListSerializer

    def patch(self, request, **kwargs):
        if 'id' not in request.data:
            return Response("'id' must be present in request data")

        if 'destination' not in request.data:
            return Response("'destination' must be present in request data")

        try:
            id = int(request.data['id'])
        except ValueError:
            return Response("'id' must be integer")

        try:
            destination = int(request.data['destination'])
        except ValueError:
            return Response("'destination' must be integer")

        newpos = destination
        tasklist = List.objects.get(pk=id)
        oldpos = tasklist.order

        # if newpos>oldpos:
        #     newpos-=1
        board = Board.objects.get(id=tasklist.board.id)
        if newpos >= board.lists_count:
            return Response(data="List order out of bounds", status=status.HTTP_400_BAD_REQUEST)

        

        # move object to the end
        tasklist.order = board.lists_count
        tasklist.save()

        dir = 1 if newpos >= oldpos else -1
        pos = oldpos
        while pos != newpos:
            tasklist2 = List.objects.get(order=pos+dir, board=board.id)
            tasklist2.order = pos
            tasklist2.save()
            pos += dir

        # move object to the desired position
        tasklist.order = newpos
        tasklist.save()

        return Response(status=status.HTTP_201_CREATED)



class CreateListView(generics.CreateAPIView):
    queryset = List.objects.all()
    serializer_class = CreateListSerializer

    def post(self, request):
        board = Board.objects.get(id=request.data['board'])
        serializer = self.get_serializer_class()(
            data={**request.data, 'order': board.lists_count})
        board.lists_count += 1
        board.save()
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
