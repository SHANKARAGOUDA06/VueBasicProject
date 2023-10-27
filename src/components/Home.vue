<template>
    <Nav></Nav>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Sl</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in allRestrurant" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.Phone }}</td>
                    <td>{{ item.Email }}</td>
                    <td>{{ item.Address }}</td>
                    <td><button type="submit" class="btn btn-success" v-on:click="upDaterestarunt(item.id)">Update</button>
                        &nbsp; <button type="submit" class="btn btn-danger"
                            v-on:click="deleteRestaraunt(item.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <Modal :show="updateModelisOpen">
        <AddPage :Add="add" :data="data" :id="selectID" @close="updateModelisOpen = false"
            @restaurantUpdated="handleRestaurantUpdated" />
    </Modal>
</template>

<script>
import Nav from "./Nav.vue";
import axios from "axios";
import Modal from "./Modal.vue";
import AddPage from '../components/Add.vue';
import { mapGetters, mapActions } from "vuex";
export default {
    name: "homePage",
    components: {
        Nav,
        Modal,
        AddPage
    },
    data() {
        return {
            name: '',
            updateModelisOpen: false,
            selectID: null,
            add: null,
            data: [],
        }
    },
    // computed: mapState({
    //     restaurant: state => state.home.restaurant
    // }), 
    computed:mapGetters(['allRestrurant']),
    methods: {
        ...mapActions(['deleteItem']),
        async upDaterestarunt(id) {
            this.selectID = id;
            let result = await axios.get(`http://localhost:3000/reststurant/${this.selectID}`)
            this.data = result.data;
            this.add = false;
            this.updateModelisOpen = true;
        },
        closeAddModal() {
            this.updateModelisOpen = false;
        },
        handleRestaurantUpdated() {
            this.closeAddModal();
            this.$router.push({ path: 'home' })
        },
        logout() {
            localStorage.clear();
            this.$router.push({ path: 'login' })
        },
        async deleteRestaraunt(id) {
            let result=await this.deleteItem(id)
            // let result = await axios.delete('http://localhost:3000/reststurant/' + id)
            if (result.status == 200) {
                this.loaddata();    
            }
        },
        async loaddata() {
            let user = localStorage.getItem('user-info');
            this.name = JSON.parse(user).name;
            if (!user) {
                this.$router.push({ path: '/' })
            }
          await this.$store.dispatch('getRestaurant');
        }
    },
    async mounted() {
        this.loaddata();
    }
}
</script>

<style scoped></style>
