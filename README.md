# RegBuilder
Tired of trying to remember all the ugly syntax of writing regular expressions? Want to create a complex expression, and write it in a more readable form that wont take hours to comprehend later down the road? 

This might be your solution. See the thing is regular expressions were not meant to be human readable. It is a micro language designed to parse text and find patterns in it that would be difficult or more time consuming to do in a more traditional fashion. The syntax is strange, it is hard to remember all the special characters, flags, etc. So. here we are

# API
using RegBuilder is very sinple:
```
let rx = RegBuilder.init
         .caseInsensitive
         .startOfInput
         .string('hello ')
         .capture
            .anyOf
               .string('world')
               .string('gorgeous')
               .string('dave')
            .end
         .end
         .toRegExp();

console.log(rx.source)

// should see in console: hello (world|gorgeous|dave)
```
The entire api is chainable, except for a few methods that will be described below

