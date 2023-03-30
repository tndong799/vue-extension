import { h } from 'vue';
const App = {
    data() {
        return {
            counter: 0,
        };
    },
    mounted() {
        setInterval(() => {
            this.counter++;
        }, 1000);
    },
    render() {
        return h('p', {}, `COUNTER: ${this.counter}`);
    },
};

export default App;
