<template>
    <div class="loaderWrap">
        <div class="l_top">请上传<span>{{msg.title}}</span>照片</div>
        <div class="l_cont">
            <div class="imgBox" @click="showPop = true">
                <p v-show="showImg" class="p1">上传{{msg.title}}照片</p>
                <img :src="imgUrl" alt="">
            </div>
        </div>
        <div v-transfer-dom>
            <popup v-model="showPop">
                <div class="popupBox">
                    <div class="title">
                        <i class="ico" @click="showPop = false"></i>
                        {{msg.popupTitle}}
                    </div>
                    <div class="cont" >
                        <slot name="popupText">示例</slot>
                        <img :src="msg.photoUrl" alt="">
                    </div>
                    <div class="btn" @click="showPop = false">
                        <p>上传照片</p><input type="file" @change="update(1, $event)" />
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UpLoader",
        created() {
            // console.log(this.msg);
        },
        props: {
            msg: Object
        },
        data() {
            return {
                showPop: false,
                showImg: true,
                imgUrl: ''
            }
        },
        methods: {
            update(a, e) {
                let file = e.target.files[0];
                lrz(file).then((rst) => {
                    var base64 = rst.base64;
                    if (base64.indexOf(';') < 0) {
                        base64 = base64.replace('data:', 'data:image/jpeg;');
                    }
                    if (base64.indexOf('data:;') > -1) {
                        base64 = base64.replace('data:', 'data:image/jpeg;');
                    }
                    this.uploadReq(a,base64);
                })
            },
            async uploadReq(a, base64) {
                this.showImg = false;
                this.$vux.loading.show({ text: '图片上传中' });
                let reqData = {
                    imageBase64:base64,
                    claimId: '123654231214'
                };
                let res = await this.API.uploadOnePicture(reqData);
                this.imgUrl = res.path;
                this.$emit('getUrl', this.imgUrl);
                this.$vux.loading.hide();
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/reset";
    .loaderWrap{ width: 100%;
        .l_top{
            height: .35rem; background: #f5f5f5; @include ftc(12px, .35rem, #999); padding-left: .16rem;
            span{color: orange; }
        }
        .l_cont{ height: 1.8rem; background: #ffffff; display: flex; align-items: center; justify-content: center;}
        .imgBox{
            .p1{@include ftc(14px, 20px, #fff); text-align: center; margin-top: 1.18rem;}
            width: 2.35rem; height: 1.46rem; @include bis('//img30.360buyimg.com/jr_image/jfs/t1/1114/37/13523/7958/5bd81e32Ed4290cd4/acd24ff7a227cd29.png');
            img{ width: 100%; height: 100%;}
        }
    }
    .popupBox{
        .title{
            i{@include dwh(.4rem, .4rem); @include bis('//img30.360buyimg.com/jr_image/jfs/t1/7990/23/3479/958/5bd6d9f2E87fd4bab/695da0814e889529.png'); position: absolute;left: 0; top: 50%; transform: translateY(-50%);}
            position: relative; height: .55rem; @include ftc(18px, .55rem, #333); border-radius: 0 1px 1px  0; text-align: center; border-bottom: 1px solid #ececec;}
        .cont {
            margin-top: .23rem; margin-bottom: 1rem; padding: 0 .16rem;
            .p1 {@include ftc(14px,14px, #333); margin-left: .15rem;span {color: #ff9500}}
            img{ margin-top: .1rem; }
        }
        .btn{
            width: 100%;height: .55rem; position: absolute; bottom: 0; text-align: center; @include ftc(17px, .55rem, #fff); background: #435DFF;
            P{position: absolute; width: 100%; height: 100%;}
            input { opacity: 0; width: 100%; height: 100%; }
        }
    }
</style>
