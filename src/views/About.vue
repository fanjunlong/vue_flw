<template>
    <div class="about">
        <group title="当个标题" label-width="5.5em" label-margin-right="2em">
            <x-input @click.native="addrShow = true" title="地址选择" v-model="newAddr"></x-input>
        </group>
        <div>
            <up-loader :msg="msg1" v-on:getUrl="getUrl">
                <p slot="popupText" class="p1">请<span>清晰拍出车牌</span></p>
            </up-loader>
        </div>
        <div v-transfer-dom>
            <!--<jrvm-addr-picker v-model="addrShow"-->
                              <!--:chosen="addrPicker.chosen"-->
                              <!--:links="addrPicker.links"-->
                              <!--:formatParam="addrPicker.formatParam"-->
                              <!--:formatResult="addrPicker.formatResult"-->
                              <!--@on-choose="choose">-->
            <!--</jrvm-addr-picker>-->
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import AddrPicker from '../components/addrPicker/AddrPicker'
    import UpLoader from '../components/upLoader/UpLoader'
    export default {
        name: 'about',
        components: {
             UpLoader
        },
        data() {
            return {
                show: true,
                newAddr: '',
                value: '多撒多撒',
                value1: '出现在',
                addrShow: false,
                addrPicker: {
                    chosen: [],
                    links: ['//baozhang.jd.com/address/selectProvince','//baozhang.jd.com/address/selectCity','//baozhang.jd.com/address/selectArea','//baozhang.jd.com/address/selectTown'],
                    formatParam: function (id, index) {
                        if(index === 1) {
                            return {idProvince: id}
                        }
                        if(index === 2) {
                            return {idCity: id}
                        }
                        if(index === 3) {
                            return {idArea: id}
                        }
                        // return {pid: id}
                    },
                    // 需要格式化成 [{id: xxx, value: xxx}] 的格式
                    formatResult: function (res, index, id) {
                        let list = res.addressList;
                        let resultList = [];
                        list.forEach((_) => {
                            resultList.push({id: _.id, value: _.name})
                        });
                        return resultList
                    }
                },
                msg1: {
                    title: '车辆正面',
                    popupTitle: '上传车辆正面照示例',
                    photoUrl: '//img30.360buyimg.com/jr_image/jfs/t1/9345/39/3632/341004/5bd7cabfE0c7e7481/a9903cfc0bbd9358.png'
                },
            }
        },
        methods: {
            choose(resultList) {
                let chosen = [];
                resultList.forEach((_) => {
                    chosen.push({id: _.id, value: _.value})
                });
                this.newAddr = chosen.map((item) => { return item.value}).join("");
                this.addrPicker.chosen = chosen
            },
            getUrl(val) {
                console.log(val)
            }
        }
    }
</script>
