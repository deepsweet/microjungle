(function(d, Element) {
  var microjungle = function(template) {
    
    // they just doing their job.
    var monkeys =  function(what, who) {
      what.each(function(j) {
        
        if (!j) {
          return;
        }
         
        if (typeof j == 'string') {
          who.innerHTML += j;
        } 
        else if (typeof j[0] == 'string') {
          var el = new Element(j.shift()),
              attrs = {}.toString.call(j[0]) === '[object Object]' && j.shift();

          attrs && el.setProperties(attrs);
          who.appendChild(monkeys(j, el));
        } 
        else if (j.nodeType === 11) {
          who.appendChild(j);
        } 
        else {
          monkeys(j, who);
        }
      })

      return who;
    };

    return monkeys(template, d.createDocumentFragment());
  };
  
  Element.implement({
    
    microjungle: function(template) {
      return this.appendChild(microjungle(template));
    }
  })
  
})(document, Element)
