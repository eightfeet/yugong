/**
 * saferInnerHtml
 * @param app The element to inject markup into
 * @param template The string to inject into the element
 * @param append [optional] If true, append string to existing content instead of replacing it
 */
function saferInnerHtml (template: string) {
    //
    // div
    //
    const div = document?.createElement('div');

    //
    // Variables
    //

    let parser: DOMParser | null = null;

    //
    // Methods
    //

    let supports = function () {
        if (!Array.from || !window.DOMParser) return false;
        parser = parser || new DOMParser();
        try {
            parser.parseFromString('x', 'text/html');
        } catch (err) {
            return false;
        }
        return true;
    };

    /**
     * Add attributes to an element
     * @param {Node}  elem The element
     * @param {Array} atts The attributes to add
     */
    let addAttributes = function (elem: { [x: string]: any; className: any; setAttribute: (arg0: any, arg1: any) => void; }, atts: any[]) {
        atts.forEach((attribute) => {
            // If the attribute is a class, use className
            // Else if it starts with `data-`, use setAttribute()
            // Otherwise, set is as a property of the element
			if (attribute.att === 'class') {
				elem.className = attribute.value;
			} else if (attribute.att.slice(0, 5) === 'data-') {
				elem.setAttribute(attribute.att, attribute.value || '');
			} else if (attribute.att === 'style') {
				elem.setAttribute(attribute.att, attribute.value || '');
			} else {
				elem[attribute.att] = attribute.value || '';
			}
            
        });
    };

    /**
     * Create an array of the attributes on an element
     * @param  {NamedNodeMap} attributes The attributes on an element
     * @return {Array}                   The attributes on an element as an array of key/value pairs
     */
    let getAttributes = function (attributes: Iterable<unknown> | ArrayLike<unknown>) {
        return Array.from(attributes).map((attribute: any) => {
            return {
                att: attribute.name,
                value: attribute.value,
            };
        });
    };

    /**
     * Make an HTML element
     * @param  {Object} elem The element details
     * @return {Node}        The HTML element
     */
    const makeElem = function (elem: { type: string; content: string; atts: any[]; children: any[]; }) {
        // Create the element
        let node: any =
            elem.type === 'text'
                ? document.createTextNode(elem.content)
                : document.createElement(elem.type);
        // Add attributes
        addAttributes(node, elem.atts);
        // If the element has child nodes, create them
        // Otherwise, add textContent
        if (elem.children.length > 0) {
			try {
				elem.children.forEach((childElem) => {
					node.appendChild(makeElem(childElem));
				});
			} catch (error) {
				console.log(elem)
				console.log(error)
				throw error;
			}
            
        } else if (elem.type !== 'text') {
            node.textContent = elem.content;
        }
        return node;
    };

    /**
     * Render the template items to the DOM
     * @param  {Array} map A map of the items to inject into the DOM
     */
    let renderToDOM = function (map: any[]) {
        map.forEach((node) => {
            div.appendChild(makeElem(node));
        });
    };

    /**
     * Create a DOM Tree Map for an element
     * @param  {Node}   element The element to map
     * @return {Array}          A DOM tree map
     */
    const createDOMMap = function (element: HTMLElement) {
        let map: any[] = [];
        Array.from(element.childNodes).forEach((node: any) => {
            map.push({
                content:
                    node.childNodes && node.childNodes.length > 0
                        ? null
                        : node.textContent,
                atts: node.nodeType === 3 ? [] : getAttributes(node.attributes),
                type: node.nodeType === 3 ? 'text' : node.tagName.toLowerCase(),
                children: createDOMMap(node),
            });
        });
        return map;
    };

    /**
     * Convert a template string into HTML DOM nodes
     * @param  {String} str The template string
     * @return {Node}       The template HTML
     */
    let stringToHTML = function (str: string) {
        parser = parser || new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    //
    // Inits
    //

    // Check for browser support
    if (!supports())
        throw new Error('saferInnerHtml: Your browser is not supported.');

    try {
        renderToDOM(createDOMMap(stringToHTML(template)));
        // get safeDom
        return div.innerHTML;
    } catch (error) {
		return template
	}
}

export default saferInnerHtml;