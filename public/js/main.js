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
    template: `<Sprite>
        <TextField touchEnabled="true" textColor="#00FFFF" x="11" y="12" @touchTap="onLabelClick">{{test3}}</TextField>
    </Sprite>`
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
    mounted(){
        console.log('MyImage', this.skin)
    },
    methods: {
    },
    computed: {
        texture(){
            return this.skin;
        }
    },
    template: `<Sprite>
        <TextField>{{texture}}</TextField>
    </Sprite>`
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
        console.log('MyButton', this.skin)
        this.$emit('test', '1111');
    },
    methods: {
        onLabelClick(){
            this.$emit('test', '1111');
        }
    },
    template: `<MyImage touchEnabled="true" @touchTap="onLabelClick" :skin="skin"></MyImage>`
})

var Main = VueEgret.classMain({
    data(){
        return {
            count: 0,
            list: [1,2]
        }
    },
    methods: {
        onLabelClick(){
            this.count += 1
            this.list.push(this.count)
        },
        onTest(evt){
            this.count += 1
            console.log(evt.data)
        }
    },
    mounted () {
        console.log(this);
    },
    template: `<MyButton :x="$stage.stageWidth>>1" @test="onTest" :skin="count"></MyButton>`
})

/*      <Sprite v-for="(value, key) in list" x="11" y="40">
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