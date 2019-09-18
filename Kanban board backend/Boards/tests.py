from django.test import TestCase
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.test import APIRequestFactory
from .views import *
from .models import *


class BoardTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()

    def test_create_board(self):
        request = BoardTests.factory.post(
            '/boards/',
            {'title': 'new board'},
        )
        response = BoardView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'new board')
        assert('id' in response.data)
        self.assertEqual(type(response.data['id']), int)
        try:
            Board.objects.get(pk=response.data['id'])
        except ObjectDoesNotExist:
            self.fail('Created board is not present in database')

    def test_get_boards(self):
        # clear database and build known boards layout
        Board.objects.all().delete()
        board1 = Board.objects.create(title='board 1')
        board2 = Board.objects.create(title='board 2')
        board3 = Board.objects.create(title='board 3')

        data = [
            {'id': board1.id, 'title': 'board 1'},
            {'id': board2.id, 'title': 'board 2'},
            {'id': board3.id, 'title': 'board 3'},
        ]

        request = BoardTests.factory.get('/boards')
        response = BoardView.as_view()(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, data)

    def test_get_board_details(self):
        board_to_get = Board.objects.create(title='test board')
        list1 = List.objects.create(
            title='list 1', board=board_to_get, order=0)
        list2 = List.objects.create(
            title='list 2', board=board_to_get, order=1)
        task1 = Task.objects.create(title='task 1', list_fk=list1)
        task2 = Task.objects.create(title='task 2', list_fk=list1)
        task3 = Task.objects.create(title='task 3', list_fk=list2)

        data = {
            'title': 'test board',
            'id': board_to_get.id,
            'lists': [
                {
                    'id': list1.id,
                    'title': 'list 1',
                    'order': 0,
                    'tasks': [
                        {'id': task1.id, 'title': 'task 1'},
                        {'id': task2.id, 'title': 'task 2'},
                    ]
                },
                {
                    'id': list2.id,
                    'title': 'list 2',
                    'order': 1,
                    'tasks': [
                        {'id': task3.id, 'title': 'task 3'},
                    ]
                },
            ]
        }

        request = BoardTests.factory.get('/boards/%d' % board_to_get.id)
        response = BoardDetailsView.as_view()(request, pk=board_to_get.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, data)

    def test_delete_board(self):
        board_to_delete = Board(title='to delete')
        board_to_delete.save()

        request = BoardTests.factory.delete(
            '/boards/%d' % board_to_delete.id,
        )
        response = BoardDetailsView.as_view()(request, pk=board_to_delete.id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(ObjectDoesNotExist,
                          Board.objects.get, pk=board_to_delete.id)


class ListTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.test_board = Board.objects.create(title='test board')

    def test_create_list(self):
        request = ListTests.factory.post(
            '/boards/lists/',
            {
                'board': ListTests.test_board.id,
                'title': 'new list',
            },
        )
        response = CreateListView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'new list')
        self.assertEqual(response.data['board'], ListTests.test_board.id)
        assert('id' in response.data)
        self.assertEqual(type(response.data['id']), int)
        try:
            List.objects.get(pk=response.data['id'])
        except ObjectDoesNotExist:
            self.fail('Created list is not present in database')

    def test_update_list(self):
        list = List.objects.create(
            title='test list',
            board=ListTests.test_board,
            order=1,
        )

        request = ListTests.factory.put(
            '/boards/lists/%d' % list.id,
            {
                'board': ListTests.test_board.id,
                'title': 'updated list',
            },
        )
        response = ListView.as_view()(request, pk=list.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data,
                         {
                             'id': list.id,
                             'title': 'updated list',
                             'board': ListTests.test_board.id
                         })
        updatedList = List.objects.get(pk=list.id)
        self.assertEqual(updatedList.title, 'updated list')
        self.assertEqual(updatedList.board, ListTests.test_board)
        self.assertEqual(updatedList.order, 1)

    def test_delete_list(self):
        list = List.objects.create(
            title='test list',
            board=ListTests.test_board,
            order=2,
        )

        request = ListTests.factory.delete(
            '/boards/tasks/%d' % list.id
        )
        response = ListView.as_view()(request, pk=list.id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)
        self.assertRaises(ObjectDoesNotExist, List.objects.get, pk=list.id)

    def test_move_list(self):        
        ListTests.test_board.lists.all().delete()
        listsIds = []
        for i in range(5):
            request = ListTests.factory.post(
                '/boards/lists/',
                {
                    'board': ListTests.test_board.id,
                    'title': 'list %d'%i,
                },
            )
            response = CreateListView.as_view()(request)
            listsIds.append(response.data['id'])

        lists = [List.objects.get(pk=l) for l in listsIds]
        # check if lists are initially sorted
        for i in range(5):
            self.assertEqual(lists[i].order,i)

        
        request = ListTests.factory.patch(
                '/boards/lists/move/',
                {
                    'id': lists[1].id,
                    'destination': 3,
                },
            )
        response = MoveListView.as_view()(request)
        lists = [List.objects.get(pk=l) for l in listsIds]
        self.assertEqual(lists[0].order,0)
        self.assertEqual(lists[1].order,3)
        self.assertEqual(lists[2].order,1)
        self.assertEqual(lists[3].order,2)
        self.assertEqual(lists[4].order,4)

        request = ListTests.factory.patch(
                '/boards/lists/move/',
                {
                    'id': lists[3].id,
                    'destination': 1,
                },
            )
        response = MoveListView.as_view()(request)
        lists = [List.objects.get(pk=l) for l in listsIds]
        self.assertEqual(lists[0].order,0)
        self.assertEqual(lists[1].order,3)
        self.assertEqual(lists[2].order,2)
        self.assertEqual(lists[3].order,1)
        self.assertEqual(lists[4].order,4)
        

        



class TaskTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.factory = APIRequestFactory()
        cls.test_board = Board.objects.create(title='test board')
        cls.test_list = List.objects.create(
            title='test list',
            board=cls.test_board,
            order=0
        )

    def test_create_task(self):
        request = TaskTests.factory.post(
            '/boards/tasks/',
            {
                'list_fk': TaskTests.test_list.id,
                'title': 'new task',
            },
        )
        response = CreateTaskView.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'new task')
        self.assertEqual(response.data['list_fk'], TaskTests.test_list.id)
        assert('id' in response.data)
        self.assertEqual(type(response.data['id']), int)
        try:
            Task.objects.get(pk=response.data['id'])
        except ObjectDoesNotExist:
            self.fail('Created task is not present in database')

    def test_update_task(self):
        task = Task.objects.create(
            title='test task',
            list_fk=TaskTests.test_list
        )

        request = TaskTests.factory.put(
            '/boards/tasks/%d' % task.id,
            {
                'list_fk': TaskTests.test_list.id,
                'title': 'updated task',
            },
        )
        response = TaskView.as_view()(request, pk=task.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data,
                         {
                             'id': task.id,
                             'title': 'updated task',
                             'list_fk': TaskTests.test_list.id
                         })
        updatedTask = Task.objects.get(pk=task.id)
        self.assertEqual(updatedTask.title, 'updated task')
        self.assertEqual(updatedTask.list_fk, TaskTests.test_list)

    def test_delete_task(self):
        task = Task.objects.create(
            title='test task',
            list_fk=TaskTests.test_list
        )

        request = TaskTests.factory.delete(
            '/boards/tasks/%d' % task.id
        )
        response = TaskView.as_view()(request, pk=task.id)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data, None)
        self.assertRaises(ObjectDoesNotExist, Task.objects.get, pk=task.id)
