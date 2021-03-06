import { objectMap, objectMapEntries } from 'bumblebee-utils'
import Vue from 'vue'

const _parse = (str, payload) => {
  return str.replace(/{{(payload.?(.+?))}}/g, (_,g1,g2) => payload[g2] || eval(g1))
}

const _handler = (name, generator) => {
  if (generator.fields) {

      var fields = Object.entries(generator.fields).map(([key, _field])=>{
          var field = {..._field};
          field.key = key;
          field.label = field.name;
          if (field.type === 'array' || (field.items && field.items.length)) {
              field.type = 'select';
          } else if (field.type === 'string') {
              field.type = 'field';
          }

          if (field.items && field.items.length && (!field.items[0].text && !field.items[0].value)) {
              field.items = field.items.map(value=>({text: value, value}));
          }
          return field;
      })

      var validate = (c) => {
          for (const key in generator.fields) {
              const field = generator.fields[key];
              if (field.empty === false && !c[key]) {
                  return false;
              }
          }
          return true;
      }

      var content = (c) => {
        var generator = c._generator;
        return _parse(generator.content, c);
      }

      return { custom: true, dialog: {title: generator.name, fields, validate}, content, payload: (columns)=>{
        var payload = {
          _custom: true,
          columns,
          command: name,
        };
        Object.entries(generator.fields || {}).forEach(([key, field])=>{
          if (!field.noPayload && field.default !== undefined) {
            payload[key] = field.default;
          }
        });
        Object.entries(generator.payload || {}).forEach(([key, value])=>{
          payload[key] = value;
        });
        return payload;
      } };

  }
}

export const state = () => ({
  generators: {}
})


export const mutations =  {
  setGenerator (state, { key, generator }) {
    state.generators[key] = generator;
  },
  setAllGenerators (state, { content }) {
    var generators = {};
    content.split("#####").filter(a=>a).forEach(item=>{
      var [ id, jsonString, code, declaration ] = item.split("###").map(s=>s.trim());
      if (id && jsonString) {
          var json = JSON.parse(jsonString)
          generators[id] = { ...json, code, declaration };
      }
    })
    state.generators = generators
  },
  deleteGenerator (state, { key }) {
    delete state.generators[key];
  },
}

export const actions =  {

}

export const getters =  {
  generatorsJson (state) {
    var str = "";
    Object.entries(state.generators).forEach(([name, generator])=>{
      var { declaration, code, ...gen } = generator;
      str += `#####\n${name}\n###\n${JSON.stringify(gen)}\n###\n${code}\n###\n${declaration}\n`
    });
    return str;
  },
  handlers (state) {
    return objectMapEntries(state.generators, (name,generator)=>_handler(name,generator))
  },
  genericCommandPayload () {
    return (payload)=>{
      var generator = payload._generator;
      var code = _parse(generator.code, payload);
      return {code, declaration: generator.declaration, _custom: true};
    }
  },
  menuItems (state, getters, rootState) {
    return Object.entries(state.generators)
    .filter(([key, generator])=>{
      if (generator.engine && rootState.localEngineParameters && rootState.localEngineParameters.engine) {
        var currentEngine = rootState.localEngineParameters.engine;
        return ((Array.isArray(generator.engine) && generator.engine.includes(currentEngine)) || generator.engine === currentEngine)
      }
      return true;
    })
    .map(([key, generator])=>{
      return {command: key, text: generator.name, group: 'CUSTOM'};
    })
  },
}
