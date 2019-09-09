from django.urls import path
from .views import BoardView, TaskView, ListView, BoardDetailsView, CreateTaskView, CreateListView

urlpatterns = [
    path('', BoardView.as_view()),
    path('<int:pk>', BoardDetailsView.as_view()),
    path('tasks/', CreateTaskView.as_view()),    
    path('tasks/<int:pk>', TaskView.as_view()),
    path('lists/', CreateListView.as_view()),
    path('lists/<int:pk>', ListView.as_view()),
]
