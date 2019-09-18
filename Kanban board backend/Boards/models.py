from django.db import models


class Board(models.Model):
    title = models.CharField(max_length=30)
    lists_count = models.IntegerField(default=0)

class List(models.Model):
    title = models.CharField(max_length=30)
    order = models.IntegerField(unique=True)
    board = models.ForeignKey(
        Board, related_name='lists', on_delete=models.CASCADE)

class Task(models.Model):
    title = models.CharField(max_length=30)
    list_fk = models.ForeignKey(
        List, related_name='tasks', on_delete=models.CASCADE)
