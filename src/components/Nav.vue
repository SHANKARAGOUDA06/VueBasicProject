<template>
    <div class="nav">
        <router-link to="home"> Home</router-link>
        <a @click="openAddModal()">Add Restaurant</a>
        <a @click="logout()">Logout</a>
    </div>
    <Modal :show="addModalIsOpen">
        <AddPage :Add="add" :data="data" @close="addModalIsOpen=false" @restaurantAdded="handleRestaurantAdded" />
    </Modal>
</template> 
  
<script> 
import "../css/nav.css"
import AddPage from '../components/Add.vue';
import Modal from '../components/Modal.vue';

export default {
    name: 'NaV',
    components: {
        AddPage,
        Modal
    },
    data() {
        return {
            addModalIsOpen: false,
            add:null,
            data:{},
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ path: 'login' });
        },
        openAddModal() {
            this.addModalIsOpen = true;
            this.add=true;
        },
        closeAddModal() {
            this.addModalIsOpen = false;
        },
        handleRestaurantAdded() {
            this.closeAddModal();
            this.$router.push({ path:'home' })
        }
    },
};
</script>