from django.shortcuts import render
from rest_framework import generics
from .models import Board, List, Task
from .serializers import BoardSerializer, BoardDetailsSerializer, ListSerializer, TaskSerializer, TaskWithListSerializer


class BoardView(generics.ListCreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class BoardDetailsView(generics.RetrieveDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardDetailsSerializer


class TaskView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CreateTaskView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskWithListSerializer


class ListView(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
