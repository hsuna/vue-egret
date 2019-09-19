VueEgret.component('MyLabel', {
    data(){
        return {
            text1: 'loading'
        }
    },
    methods: {
        onLabelClick(){
            this.text1 += '1'
        }
    },
    template: `<TextField touchEnabled="true" textColor="#00FFFF" x="11" y="12" @touchTap="onLabelClick">{{text1+text1}}</TextField>`
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
        }
    },
    template: `<Sprite x="11" y="12">
        <Sprite v-for="(value, key) in list" x="11" y="40">
            <TextField textColor="#FF00FF" :x="key*75" y="75">{{value}}</TextField>
        </Sprite>
        <TextField textColor="#FF00FF" x="0" y="0" touchEnabled="true" @touchTap="onLabelClick">{{count+count}}</TextField>
        <MyLabel v-if="count<3" x="11" y="90"></MyLabel>
        <MyLabel v-else-if="count<10" x="11" y="180"></MyLabel>
        <MyLabel v-else x="11" y="270"></MyLabel>
    </Sprite>`
})