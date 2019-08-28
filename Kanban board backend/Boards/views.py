from django.shortcuts import render
from rest_framework import generics
from .models import Board, List, Note
from .serializers import BoardSerializer, BoardDetailsSerializer, ListSerializer, NoteSerializer, NoteWithListSerializer


class BoardView(generics.ListCreateAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class BoardDetailsView(generics.RetrieveDestroyAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardDetailsSerializer


class NoteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class CreateNoteView(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteWithListSerializer


class ListView(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
