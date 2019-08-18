from django.urls import path
from .views import BoardView, NoteView, ListView

urlpatterns = [
    path('', BoardView.as_view()),
    path('notes/<int:pk>', NoteView.as_view()),
    path('lists/<int:pk>', ListView.as_view()),
]
