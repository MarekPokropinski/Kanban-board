from django.urls import path
from .views import BoardView, NoteView, ListView, BoardDetailsView

urlpatterns = [
    path('', BoardView.as_view()),
    path('<int:pk>', BoardDetailsView.as_view()),
    path('notes/<int:pk>', NoteView.as_view()),
    path('lists/<int:pk>', ListView.as_view()),
]
