#from django.test import TestCase

# Create your tests here.
try:
    my_dict = {}

    address = my_dict.pop('address')
    print(address)
except KeyError:
    print("key error oops")