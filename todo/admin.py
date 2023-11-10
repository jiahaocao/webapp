from django.contrib import admin
from . import models

# Register your models here.

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

class SubcriteriaInline(admin.StackedInline):
    model = models.Subcriteria
    extra = 1

class CriteriaAdmin(admin.ModelAdmin):
    inlines = [SubcriteriaInline]

class VariableInline(admin.StackedInline):
    model = models.Variable
    extra = 1

class SubcriteriaAdmin(admin.ModelAdmin):
    inlines = [VariableInline]

admin.site.register(models.Criteria, CriteriaAdmin)
admin.site.register(models.Subcriteria, SubcriteriaAdmin)
admin.site.register(models.Variable)

admin.site.register(models.Todo, TodoAdmin)
admin.site.register(models.Product)

