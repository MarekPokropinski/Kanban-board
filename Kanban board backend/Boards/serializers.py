from rest_framework import serializers
from .models import Board, List, Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'description')
        model = Note

class NoteWithListSerializer(serializers.ModelSerializer):
    # list_id = serializers.PrimaryKeyRelatedField(queryset)
    class Meta:
        fields = ('id', 'title', 'description', 'list_fk')
        model = Note

class ListSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(read_only=True, many=True)

    class Meta:
        fields = ('id', 'title', 'notes')
        model = List


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title')
        model = Board


class BoardDetailsSerializer(serializers.ModelSerializer):
    lists = ListSerializer(read_only=True, many=True)
    class Meta:
        fields = ('id', 'title', 'lists')
        model = Board
