from django.db import models


class Board(models.Model):
    title = models.CharField(max_length=30)


class List(models.Model):
    title = models.CharField(max_length=30)
    board = models.ForeignKey(
        Board, related_name='lists', on_delete=models.CASCADE)


class Note(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    list_fk = models.ForeignKey(
        List, related_name='notes', on_delete=models.CASCADE)
