from rest_framework import serializers
from .models import Board, List, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title')
        model = Task


class TaskWithListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'list_fk')
        model = Task


class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(read_only=True, many=True)

    class Meta:
        fields = ('id', 'title', 'tasks', 'order')
        model = List


class ListWithBoardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'board')
        model = List


class CreateListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title', 'board', 'order')
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


class MoveListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    destination = serializers.IntegerField()
