from rest_framework import serializers
from .models import Board, List, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'title')
        model = Task

class TaskWithListSerializer(serializers.ModelSerializer):
    # list_id = serializers.PrimaryKeyRelatedField(queryset)
    class Meta:
        fields = ('id', 'title', 'list_fk')
        model = Task

class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(read_only=True, many=True)

    class Meta:
        fields = ('id', 'title', 'tasks')
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
