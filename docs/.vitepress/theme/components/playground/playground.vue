<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="editorChange($event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
  <iframe class="iframe" :srcdoc="code"></iframe>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref, shallowRef } from 'vue'

const code = ref(`
  <html>
    <head>
      <title>Vue 3 Playground</title>
      <script type="text/javascript">
        window.onload = function() {
          document.body.append('Script executed');
        };
      <\/script>
    </head>
    <body>
      <h1>Hello Vue 3!</h1>
      <p>CodeMirror Editor</p>

      <style>
        p {
          color: red;
        }
      </style>
    </body>
  </html>
`);

const extensions = [javascript(), oneDark]

// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

function editorChange(event) {
  code.value = event
}

const log = (event, data) => {
  console.log(event, data)
};
</script>

<style scoped>
.iframe {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
}
</style>