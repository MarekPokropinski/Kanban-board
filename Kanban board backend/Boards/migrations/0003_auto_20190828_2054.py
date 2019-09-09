# Generated by Django 2.1.7 on 2019-08-28 18:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Boards', '0002_list_note'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
            ],
        ),
        migrations.RemoveField(
            model_name='note',
            name='list_fk',
        ),
        migrations.AlterField(
            model_name='list',
            name='board',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lists', to='Boards.Board'),
        ),
        migrations.DeleteModel(
            name='Note',
        ),
        migrations.AddField(
            model_name='task',
            name='list_fk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='Boards.List'),
        ),
    ]