from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    def __str__(self):
        return self.title

class Product(models.Model):
    brand = models.CharField(max_length=128)
    model = models.CharField(max_length=128)
    image = models.ImageField(upload_to='product')

    system = models.CharField(max_length=32)
    price = models.IntegerField()
    ram = models.IntegerField()
    rom = models.IntegerField()

    aux = models.TextField(blank=True)

    def __str__(self):
        return self.brand + ' ' + self.model

class Criteria(models.Model):
    title = models.CharField(max_length=32)
    text = models.CharField(max_length=512, blank=True)
    func = models.TextField(blank=True)

    def __str__(self):
        return 'Criteria - %s' % self.title

    def to_dict(self):
        content = {
            'key': 'cri' + str(self.pk),
            'title': self.title,
            'text': self.text,
            'func': self.func,
            'children': [],
        }
        for sub in self.subcriteria_set.all():
            content['children'].append(sub.to_dict())
        return content

class Subcriteria(models.Model):
    criteria = models.ForeignKey(Criteria, on_delete=models.CASCADE)
    title = models.CharField(max_length=32)
    text = models.CharField(max_length=512, blank=True)
    func = models.TextField(blank=True)

    def __str__(self):
        return 'Subcriteria - %s' % self.title

    def to_dict(self):
        content = {
            'key': 'sub' + str(self.pk),
            'title': self.title,
            'text':  self.text,
            'func': self.func,
            'children': [],
        }
        for var in self.variable_set.all():
            content['children'].append(var.to_dict())
        return content

class Variable(models.Model):
    subcriteria  = models.ForeignKey(Subcriteria, on_delete=models.CASCADE)
    title = models.CharField(max_length=32)
    text = models.CharField(max_length=512, blank=True)
    func = models.TextField(blank=True)

    def __str__(self):
        return 'Variable - %s' % self.title

    def to_dict(self):
        content = {
            'key': 'var' + str(self.pk),
            'title': self.title,
            'text':  self.text,
            'func': self.func,
            'children': [],
        }
        return content


