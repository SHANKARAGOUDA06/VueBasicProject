<template>
    <form>
        <div class="restaurant">
            <span v-on:click="closetab()" class="close">&times;</span>
            <input type="text" placeholder="Enter Restaurant Name" v-model="restaurant.name">
            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
            <input type="tel" placeholder="Enter Restaurant Phone" v-model="restaurant.Phone">
            <span class="error-message" v-if="errors.Phone">{{ errors.Phone }}</span>
            <input type="email" placeholder="Enter Restaurant Email" v-model="restaurant.Email">
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
            <input type="text" placeholder="Enter Restaurant Address" v-model="restaurant.Address">
            <button type="button" v-if="saveButton" v-on:click="addRestaurant">ADD NEW Restaurant</button>
            <button type="button" v-if="!saveButton" v-on:click="updateRestaurant">UPDATE Restaurant</button>
            <div class="close-button">
                <button @click="closetab">Close</button>
            </div>
        </div>
    </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import "../css/add.css";

export default {
    name: "adD",
    data() {
        return {
            restaurant: {
                name: this.data.name || '',
                Phone: this.data.Phone || '',
                Address: this.data.Address || '',
                Email: this.data.Email || ''
            },
            errors: {},
            saveButton: this.Add
        }
    },
    computed: {
        ...mapGetters(['setItem']),
    },
    props: {
        id: Number,
        Add: Boolean,
        data: Object
    },
    methods: {
        ...mapActions(['addNew', 'updateNew']),
        async updateRestaurant() {
            try {
                const validatePhone = (phone) => {
                    if (!phone.length) {
                        return { valid: false, error: "Phone Number Is Required" }
                    }
                    if (!phone.match(/^\d{10}$/)) {
                        return { valid: false, error: "Enter Valid Phone Number" }
                    }
                    return { valid: true, error: null }
                }
                const validPhone = validatePhone(this.restaurant.Phone);
                if (!validPhone.valid) {
                    this.errors.Phone = validPhone.error;
                    return;
                }
                this.errors.Phone = null;
                const validateEmail = (email) => {
                    if (!email.length) {
                        return { valid: false, error: "Email is required" }
                    }
                    if (!email.match(/^\w+([.-]?\w+)*@\w+([_.-]?\w+)*\.\w{2,3}$/)) {
                        return { valid: false, error: "Enter Valid Email" }
                    }
                    return { valid: true, error: null }
                }
                const validEmail = validateEmail(this.restaurant.Email);
                if (!validEmail.valid) {
                    this.errors.email = validEmail.error;
                    return;
                }
                this.errors.email = null;
                const dataToUpdate = this.restaurant;
                let result = await this.updateNew({ id:this.id, dataToUpdate });
                this.$router.go(0);
                if (result.status == 200) {
                    this.$emit('restaurantUpdated');
                } else {
                    this.$router.push({ path: 'home' })
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addRestaurant() {
            const validateName = (name) => {
                if (!name.length) {
                    console.log("first")
                    return { vaild: false, error: "Name Is Required" }
                }
                return { vaild: true, error: null }
            }
            const validName = validateName(this.restaurant.name);
            if (!validName.vaild) {
                this.errors.name = validName.error;
                return;
            }
            this.errors.name = null;

            const validatePhone = (phone) => {
                if (!phone.length) {
                    return { valid: false, error: "Phone Number Is Required" }
                }
                if (!phone.match(/^\d{10}$/)) {
                    return { valid: false, error: "Enter Valid Phone Number" }
                }
                return { valid: true, error: null }
            }
            const validPhone = validatePhone(this.restaurant.Phone);
            if (!validPhone.valid) {
                this.errors.Phone = validPhone.error;
                return;
            }
            this.errors.Phone = null;
            const validateEmail = (email) => {
                if (!email.length) {
                    return { valid: false, error: "Email is required" }
                }
                if (!email.match(/^\w+([.-]?\w+)*@\w+([_.-]?\w+)*\.\w{2,3}$/)) {
                    return { valid: false, error: "Enter Valid Email" }
                }
                return { valid: true, error: null }
            }
            const validEmail = validateEmail(this.restaurant.Email);
            if (!validEmail.valid) {
                this.errors.email = validEmail.error;
                return;
            }
            this.errors.email = null;

            let result = await this.addNew(this.restaurant);
            if (result.status == 201) {
                this.$emit('restaurantAdded');
            }
        },
        closetab() {
            this.$emit('close');
        }
    }
}
</script>