const RegBuilder = {
    elements: [],
    stack: [],
    multilineF: false,
    findallF: false,
    caseinsensitiveF: false,
    dotallF: false,
    stickyF: false,
    unicodeF: false,

    get init() {
    	this.elements = [];
    	this.stack = [];
        this.multilineF = false;
        this.findallF = false;
        this.caseinsensitiveF = false;
        this.dotallF = false;
        this.stickyF = false;
        this.unicodeF = false;
    	return this;
    },

    get flags() {
        return [
            this.multilineF ? 'm' : '',
            this.findallF ? 'g' : '',
            this.caseinsensitiveF ? 'i' : '',
            this.dotallF ? 'd' : '',
            this.stickyF ? 's' : '',
            this.unicodeF ? 'u' : ''
        ].join('');
    },

    get multiLine() {
        this.multilineF = true;
        return this;
    },

    get findAll() {
        this.findallF = true;
        return this;
    },

    get caseInsensitive() {
        this.caseinsensitiveF = true;
        return this;
    },

    get sticky() {
        this.stickyF = true;
        return this;
    },

    get dotAll() {
        this.dotallF = true;
        return this;
    },

    get unicode() {
        this.unicodeF = true;
        return this;
    },

    get startOfInput() {
        this.elements.push({type:'startOfInput'});
        return this;
    },

    get endOfInput() {
        this.elements.push({type:'endOfInput'});
        return this;
    },

    get anyChar() {
        this.elements.push({type:'anyChar'});
        return this;
    },

    get zeroOrMore() {
        this.elements.push({type:'zeroOrMore'});
        return this;
    },

    get oneOrMore() {
        this.elements.push({type:'oneOrMore'});
        return this;
    },

    get optional() {
        this.elements.push({type:'optional'});
        return this;
    },

    exactly(count) {
        this.elements.push({type:'exactly',value:count});
        return this;
    },

    atLeast(count) {
        this.elements.push({type:'atLeast',value:count});
        return this;
    },

    atMost(count) {
        this.elements.push({type:'atMost',value:count});
        return this;
    },

    between(min,max) {
        this.elements.push({type:'between',min,max});
        return this;
    },

    get anyOf() {
        this.elements.push({type:'anyOf',elements:[]});
        this.stack.push(this.elements);
        this.elements = [];
        return this;
    },

    get group() {
        this.elements.push({type:'group',elements:[]});
        this.stack.push(this.elements);
        this.elements = [];
        return this;
    },

    get capture() {
        this.elements.push({type:'capture',elements:[]});
        this.stack.push(this.elements);
        this.elements = [];
        return this;
    },

    namedCapture(s) {
        this.elements.push({type:'namedCapture',name:s,elements:[]});
        this.stack.push(this.elements);
        this.elements = [];
        return this;
    },

    get end() {
        let prev = this.stack.pop();
        prev[prev.length-1].elements = this.elements;
        this.elements = prev;
        return this;
    },

    string(s) {
        this.elements.push({type:'string',value:s});
        return this;
    },

    get whitespace() {
        this.elements.push({type:'whitespace'});
        return this;
    },

    get nonWhitespace() {
        this.elements.push({type:'nonWhitespace'});
        return this;
    },

    get word() {
        this.elements.push({type:'word'});
        return this;
    },

    get nonWord() {
        this.elements.push({type:'nonWord'});
        return this;
    },

    get digit() {
        this.elements.push({type:'digit'});
        return this;
    },

    get nonDigit() {
        this.elements.push({type:'nonDigit'});
        return this;
    },

    evaluate(list) {
    	//console.log(list);
    	return list.reduce(function(r,el) {
        	switch(el.type) {
        		case 'startOfInput':	r.push('^'); break;
        		case 'endOfInput':      r.push('$'); break;
        		case 'anyChar':         r.push('.'); break;
        		case 'oneOrMore':       r.push('+'); break;
        		case 'zeroOrMore':      r.push('*'); break;
        		case 'optional':        r.push('?'); break;
        		case 'whitespace':      r.push('\\s'); break;
                case 'nonWhitespace':   r.push('\\S'); break;
                case 'word':            r.push('\\w'); break;
                case 'nonWord':         r.push('\\W'); break;
                case 'digit':           r.push('\\d'); break;
                case 'nonDigit':        r.push('\\D'); break;
        		case 'string':          r.push(el.value); break;
        		case 'anyOf':           r.push(RegBuilder.evaluate(el.elements).join('|')); break;
                case 'group':           r.push(RegBuilder.evaluate(el.elements).join('')); break;
        		case 'capture':         r.push(`(${RegBuilder.evaluate(el.elements).join('')})`); break;
        		case 'namedCapture':    r.push(`(?<${el.name}>${RegBuilder.evaluate(el.elements).join('')})`); break;
                case 'exactly':         r.push(`{${el.value}}`); break;
                case 'atLeast':         r.push(`{${el.value},}`); break;
                case 'atMost':          r.push(`{,${el.value}}`); break;
                case 'between':         r.push(`{${el.min},${el.max}}`); break;
        	}
        	return r;
        },[]);
    },

    toRegString() {
        return RegBuilder.evaluate(this.elements).join('');
    },

    toRegExp() {
        return new RegExp(RegBuilder.evaluate(this.elements).join(''),this.flags);
    }
}
