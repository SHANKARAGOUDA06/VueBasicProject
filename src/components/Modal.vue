<template>
      <div class="modal" v-if="show">
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    </template>
  
  <script>
  
  export default {
    name:'ModaL',
    props: {
      show: Boolean,
    }
  };
  </script>
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    width: 50%;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 0px;
    z-index: 9999;
  }
  .close-button {
    width: max-content;
    border-radius: 10px;
    padding: 8px;
    background-color: crimson;
    z-index: 9999;
  }
  </style>
  
  