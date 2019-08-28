from django.db import models


class Board(models.Model):
    title = models.CharField(max_length=30)


class List(models.Model):
    title = models.CharField(max_length=30)
    board = models.ForeignKey(
        Board, related_name='lists', on_delete=models.CASCADE)


class Task(models.Model):
    title = models.CharField(max_length=30)
    list_fk = models.ForeignKey(
        List, related_name='tasks', on_delete=models.CASCADE)
