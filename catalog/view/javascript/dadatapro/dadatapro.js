'use strict';

function Dadata() {
 
  let helper = {
    dedug: false,
    elementDefault: {
      tag: 'div',
      props: {'data-element': 'dadata'},
      child: '<input type="text" class="suggestions-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><div class="suggestions-wrap"><ul class="js_suggestions"></ul></div>'
    },
    renderList: (response) => {
      let li = '';
      response.forEach(function(list, index) {
        li += '<li data-index="' + index + '">' + list.value + '</li>';
      });
      return li;
    },
    create: ({tag, props, child}) => {
      const element = document.createElement(tag);
      Object.keys(props).forEach((key) => {
        element[key] = props[key];
      });
      if(child) {
        element.innerHTML = child;
      }
      return element;
    },
    debounce: (f, ms) => {
      let timer = null;
      return (...args) => {
        const onComplete = () => {
          f.apply(this, args);
          timer = null;
        };
        if(timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(onComplete, ms);
      };
    },
    request: (type, params, callback) => {
      if(helper.dedug) console.log('pre-request', type, params);
      fetch('index.php?route=extension/module/dadatapro/suggestion&type=' + type, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        redirect: 'error', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(params) // body data type must match "Content-Type" header
      }).then((response) => {
        return response.json();
      }).then((data) => {
        if(helper.dedug) console.log('response', data);
        callback(data);
      }).catch((error) => {
        console.log(error);
      });
    },
    parseArray: [
      {
        delimiter: '|',
        separator: ' '
      }, {
        delimiter: ', ',
        separator: ', '
      }, {
        delimiter: ' ',
        separator: ' '
      }, {
        delimiter: '.',
        separator: '.'
      }, {
        delimiter: '. ',
        separator: '. '
      }, {
        delimiter: ':',
        separator: ':'
      }, {
        delimiter: '-',
        separator: ''
      }
    ],
    parse: () => {
      let groupSeparator = [];
      this.getGroupSeparator = () => groupSeparator;
      this.init = (str, params) => {
        let result = [];
        let flag = true;
        let separator = '';
        for(let i = 0; i < params.length; i++) {
          if(str.indexOf(params[i].delimiter) !== -1) {
            separator = params[i].separator;
            let maybeGroup = str.split(params[i].delimiter).map((maybeThis) => {
              return this.init(maybeThis, params.slice(i + 1));
            });
            if(maybeGroup.length) {
              result = result.concat(maybeGroup);
              groupSeparator.unshift(separator);
            }
            flag = false;
            break;
          }
        }
        return flag ? str : result;
      };
      return this;
    },
    getSuggestToValue: (maybeThis, suggest) => {
      if(suggest === null || suggest[maybeThis] === null) {
        return '';
      }
      if(suggest[maybeThis] && typeof suggest[maybeThis] === 'string') {
        return suggest[maybeThis];
      } else if(suggest[maybeThis] && typeof suggest[maybeThis] === 'object') {
        return helper.getSuggestToValue(maybeThis, suggest[maybeThis]);
      } else if(suggest.data && typeof suggest.data === 'object') {
        return helper.getSuggestToValue(maybeThis, suggest.data);
      }
      return '';
    },
    find: (strKeys, suggest, saveName) => {
      let values = [];
      let mainSeparator = ' ';
      let parse = helper.parse();
      let parseArray = parse.init(strKeys, helper.parseArray);
      let groupSeparator = parse.getGroupSeparator();

      if(typeof parseArray === 'string') {
        parseArray = [parseArray];
      }

      if(helper.dedug) console.log('parse keys', {
        saveName: saveName,
        strKeys: strKeys,
        groupSeparator: groupSeparator,
        parseArray: parseArray,
        suggest: suggest
      });

      parseArray.forEach((_key, index) => {
        let words = [];
        let separator = groupSeparator[index] ? groupSeparator[index] : ' ';

        if(index === 0) mainSeparator = separator;
        if(typeof _key === 'string') _key = [_key];

        _key.forEach((word) => {
          let _value = helper.getSuggestToValue(word, suggest);

          if(_value) {
            words.push(_value);
          }
        });

        if(words.length) {
          values.push(words.join(separator));
        }
      });
      values = values.join(mainSeparator);
      if(values && saveName) {
        let t = {};
        t[strKeys] = values;
        return JSON.stringify(t);
      }
      return values;
    },
    moveToList: function(keyAction, index, list, target) {
      if(keyAction === 'ArrowDown') {
        index = Math.min(index += 1, list.length - 1);
        if(index < list.length && list[index]) {
          list[index].className = 'select';
          target.value = list[index].textContent;
        }
        if(list[index - 1]) list[index - 1].className = '';
      } else if(keyAction === 'ArrowUp') {
        index = Math.max(index -= 1, -1);
        if(index > -1 && list[index]) {
          list[index].className = 'select';
          target.value = list[index].textContent;
        }
        if(list[index + 1]) list[index + 1].className = '';
      } else if(keyAction === 'Enter') {
        if(list[index]) {
          list[index].dispatchEvent(new Event('click', {bubbles: true}));
        }
      }
      if(index === -1) target.value = target.getAttribute('data-value');
      return index;
    }
  };

  return function(setting) {
    let store = {
      type: '',
      queue: []
    };
    store.type = setting.type;
    if(setting.hasOwnProperty('debug')) helper.dedug = true;

    if(typeof setting.queue == 'function') {
      store.queue.push(setting.queue);
    } else {
      setting.queue.forEach(function(elements) {
        let awaiting = document.querySelector(elements.awaiting);

        if(awaiting !== null) {
          //console.log(awaiting, elements.hasOwnProperty('prefetch'), elements.prefetch, store.type);
          if((elements.hasOwnProperty('prefetch') && typeof elements.prefetch === 'function') || (store.type !== 'address')) {

            let listOut = helper.create({
              tag: 'div',
              props: {className: 'suggestions-wrap'},
              child: '<ul class="js_suggestions"></ul>'
            });

            listOut.setAttribute('data-element', 'dadata');

            elements.listOut = listOut;

            if(awaiting.nextElementSibling) {
              if(awaiting.nextElementSibling && awaiting.nextElementSibling.classList.contains('suggestions-wrap') === false) {
                awaiting.parentElement.insertBefore(listOut, awaiting.nextElementSibling);
              }
            } else {
              awaiting.parentElement.appendChild(listOut);
            }
            listOut = listOut.querySelector('.js_suggestions');

            let clearInput = false;
            if(store.type === 'address' && elements.clear === true) {
              clearInput = elements.clear;
            }
            init(awaiting, listOut, elements.prefetch, clearInput);
          }

          elements.awaiting = awaiting;
          store.queue.push(elements);
        }
      });
    }

    if(store.queue.length === 0) return;

    let requestInput, listOut;
    if(typeof setting.element === 'string') {
      requestInput = document.querySelector(setting.element);
      listOut = helper.create({
        tag: 'div',
        props: {className: 'suggestions-wrap'},
        child: '<ul class="js_suggestions"></ul>'
      });
      if(requestInput.nextElementSibling) {
        if(requestInput.nextElementSibling && requestInput.nextElementSibling.classList.contains('suggestions-wrap') === false) {
          requestInput.parentElement.insertBefore(listOut, requestInput.nextElementSibling);
        }
      } else {
        requestInput.parentElement.appendChild(listOut);
      }
      listOut = listOut.querySelector('.js_suggestions');
    } else if(typeof setting.element === 'function') {
      let confEl = setting.element(helper);
      let beforeElement = document.querySelector(confEl.before);

      confEl.newElement.setAttribute('data-element', 'dadata');
      confEl.newElement.setAttribute('data-before', confEl.before);
      requestInput = confEl.newElement.querySelector('input');
      listOut = confEl.newElement.querySelector('.js_suggestions');

      if(beforeElement.previousElementSibling) {
        if(beforeElement.previousElementSibling.getAttribute('data-before') !== confEl.before) {
          beforeElement.parentElement.insertBefore(confEl.newElement, beforeElement);
        }
      } else {
        beforeElement.parentElement.insertBefore(confEl.newElement, beforeElement);
      }
    }

    if(setting.hasOwnProperty('reload')) {
      setting.reload({
        store: store,
        requestInput: requestInput
      }, helper);
    }
    console.log(requestInput, listOut);
    if(requestInput && listOut) {
      init(requestInput, listOut, setting.prefetch, false);
    }

    let request = helper.debounce(helper.request, (setting.delay ? setting.delay : 666)), data = [];

    function init(input, wrapList, requestParams, clearInput) {

      let params, index = -1;

      input.addEventListener('keyup', function(event) {
        if(event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter') {
          event.preventDefault();
          index = helper.moveToList(event.key, index, wrapList.children, this);
          return;
        }

        if(clearInput && !this.value) {
          this.removeAttribute('data-dadata');
        }
        params = typeof requestParams === 'function' ? requestParams(this) : {query: ''};

        if(params === false) return;
        params.query = this.value;

        request(store.type, params, function(response) {
          if('suggestions' in response) {
            data = response.suggestions;
            wrapList.innerHTML = helper.renderList(data);
            wrapList.hidden = false;
          } else {
            console.log(response);
          }
        });
      }, false);

      let timerFocus;

      input.addEventListener('focus', function() {
        if(this.name && sessionStorage.getItem(this.name)) {
          this.setAttribute('data-dadata', sessionStorage.getItem(this.name));
        }
        if(timerFocus) clearTimeout(timerFocus);
        if(data) {
          wrapList.hidden = false;
        }
      }, false);

      input.addEventListener('focusout', function() {
        timerFocus = setTimeout(function() {
          wrapList.hidden = true;
        }, 1200);
      }, false);

      wrapList.addEventListener('click', function(event) {
        let target = event.target;

        if(timerFocus) clearTimeout(timerFocus);

        if(target.tagName === 'LI') {
          wrapList.hidden = true;
          index = target.getAttribute('data-index');

          store.queue.forEach(function(queue) {
            if(typeof queue === 'function') {
              queue(data[index], helper.find);
            } else {
              let result = queue.callback(data[index], helper.find, queue.awaiting);
              if(queue.awaiting.type === 'select-one') {
                result = result.replace(/\s{0,1}[-\/].+/gi, '').toLowerCase();
                let flagFind = false;
                let i = queue.awaiting.options.length - 1;
                for(; i >= 0; i--) {
                  if(queue.awaiting.options[i].textContent.toLowerCase().search(result) >= 0) queue.awaiting.options[i].selected = flagFind = true;
                }
                if(!flagFind) queue.awaiting.options[0].selected = true;
              } else {
                queue.awaiting.value = result;
              }

              if(queue.awaiting.name && queue.awaiting.getAttribute('data-dadata')) {
                sessionStorage.setItem(queue.awaiting.name, queue.awaiting.getAttribute('data-dadata'));
                if(clearInput && queue.awaiting !== input) {
                  queue.awaiting.parentElement.querySelector('.js_suggestions').innerHTML = '';
                }
              }
            }
          });

          if(setting.hasOwnProperty('onSelected')) {
            let result = setting.onSelected(data[index], helper.find, requestInput);
            if(result) {
              requestInput.value = result;
            }
          }
        }
      }, false);
    }
  };
}

let UserDadata = new Dadata();