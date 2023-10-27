<template>
    <div class="model">
        <form>
            <div class="restaraunt">
                <span v-on:click="closetab()" class="close">&times;</span>
                <input type="text" placeholder="Enter Restaraunt Name" v-model="restaraunt.name">
                <input type="tel" placeholder="Enter Restaraunt Phone" v-model="restaraunt.Phone">
                <input type="email" placeholder="Enter Restaraunt Email" v-model="restaraunt.Email">
                <input type="text" placeholder="Enter Restaraunt Address" v-model="restaraunt.Address">
                <button type="button" v-on:click="updateRestaraunt()">UPDATE RESTARAUNT</button>
                <div class="close-button">
                    <button @click="closetab()">Close</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "upDate",
    data() {
        return {
            restaraunt: {
                name: '',
                Phone: '',
                Address: '',
                Email: ''
            }
        }
    },
    props: {
        id: Number
    },
    methods: {
        async updateRestaraunt() {
            try {
                let result = await axios.put(`http://localhost:3000/reststurant/${this.id}`, {
                    name: this.restaraunt.name,
                    Phone: this.restaraunt.Phone,
                    Address: this.restaraunt.Address,
                    Email: this.restaraunt.Email
                })
                window.location.reload();
                if (result.status == 200) {
                    this.$emit('restaurantUpdated');
                }
                else {
                    this.$router.push({ path: '/' })
                }
            } catch (error) {
                console.log('axios')
            }
        },
        closetab() {
            this.$emit('close');
        }
    },
    async mounted() {
        let result = await axios.get(`http://localhost:3000/reststurant/${this.id}`);
        this.restaraunt = result.data;
    },

}
</script>

<style scoped>
.restaraunt {
    margin: 20px;
    box-sizing: border-box;
    box-shadow: 1px 1px 12px black;
    border-radius: 5px;
    padding: 5px;
    width: 100%;
    background-color: white
}

.restaraunt input {
    width: 300px;
    height: 40px;
    padding-left: 10px;
    display: block;
    margin-top: 10px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
}

.restaraunt >button {
    width: 300px;
    height: 40px;
    background-color: chartreuse;
    border: 1px solid chartreuse;
}


.close {
    color: #a0a0a0a1;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    margin-top: -12px;
    margin-left: 154px;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.close-button button {
    background-color: red !important;
    color: white;
    border: red;
    margin-top: 20px;
    border-radius: 5px;
    padding: 4px 14px;
    margin-left: 250px;
}
</style>