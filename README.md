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

### caseInsensitive
This adds the case insensitive flag to the regex. Your expression will work on text regardless of lowercase/uppercase characters.

### multiLine
This adds the multiline flag to the regex. The start/end anchors will work on text that has newlines.

### global
This adds the global flag to the regex. This will return all matches found, not just the first.

### dotAll
This adds the dotAll flag to the regex. The wildcard character (.) will match on newlines.

### sticky
This adds the sticky flag to the regex. Will match patterns after a specified position in a string

### unicode
This adds the unicode flag. Treats the regex as a sequence of unicode code points.

### startOfInput
adds the (^) anchor to your expression

### endOfInput
adds the ($) anchor to your expression

### anyChar
add the (.) wildcard character

### oneOrMore
add the (+) one or more quantinfier

### zeroOrMore
add the (*) zero or more quantifier

### optional
add the (?) zero or one quantifier

### exactly(count)
add the {count} quantifier

### atLeast(count)
add the {count,} quantifier

### between(min,max)
add the {min,max} quantifier

### string(text)
add a string

### digit
add the (\d) digit character class

### nonDigit
add the (\D) non-digit character class

### word
add the (\w) alphanumeric character class [a-z,A-Z,0-9,_]

### capture
add a capture group

_more to come..._
