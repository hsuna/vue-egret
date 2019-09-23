VueEgret.component('MyLabel', {
    props: {
        text2: 'xxxx'
    },
    data(){
        return {
            text1: 'loading'
        }
    },
    computed: {
        test3(){
            return this.text1+this.text2;
        }
    },
    methods: {
        onLabelClick(){
            this.text1 += '1'
        }
    },
    template: `<TextField touchEnabled="true" textColor="#00FFFF" x="11" y="12" @touchTap="onLabelClick">{{test3}}</TextField>`
})

VueEgret.component('MyImage', {
    props: {
        skin: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
        }
    },
    methods: {
    },
    template: `<TextField>{{skin}}</TextField>`
})

VueEgret.component('MyButton', {
    props: {
        skin: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
        }
    },
    mounted () {
        this.$emit('test', '1111');
    },
    methods: {
    },
    template: `<MyImage :skin="skin"></MyImage>`
})

var Main = VueEgret.classFactory({
    data(){
        return {
            count: 0,
            list: []
        }
    },
    methods: {
        onLabelClick(){
            this.count += 1
            this.list.push(this.count)
        },
        onTest(val){
            console.log(val)
        }
    },
    mounted () {
        
    },
    template: `<Sprite x="11" y="12">
        <MyButton @test="onTest" skin="xxxxxxxxx"></MyButton>
    </Sprite>`
})

/* <Sprite v-for="(value, key) in list" x="11" y="40">
            <TextField textColor="#FF00FF" :x="key*75" y="75">{{value}}</TextField>
        </Sprite> 
          <TextField textColor="#FF00FF" x="0" y="0" touchEnabled="true" @touchTap="onLabelClick">{{count+count}}</TextField>
        
        <MyLabel v-if="count<3" x="11" y="90"></MyLabel>
        <MyLabel v-else-if="count<10" x="11" y="180"></MyLabel>
        <MyLabel v-else x="11" y="270"></MyLabel>
    
    
        <Sprite v-for="(value, key) in list" x="11" y="40">
            <TextField textColor="#FF00FF" :x="key*75" y="75">{{value}}</TextField>
        </Sprite> 
       
        <MyLabel x="11" y="20" :text2="count"></MyLabel>
        <MyLabel v-if="count<3" x="11" y="90"></MyLabel>
        <MyLabel v-else-if="count<10" x="11" y="180"></MyLabel>
        <MyLabel v-else x="11" y="270"></MyLabel>
      
      
      
        */