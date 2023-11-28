<template>
    
    <div id="myeditor">

      
    </div>

</template>

<script setup>

    import { onMounted, defineEmits, defineProps } from 'vue'
    import E from 'wangeditor'
    const emit = defineEmits("event")
    const props = defineProps({
           content: String
    })
    onMounted(() => {

        const editor = new E("#myeditor")
        editor.create()
        // 設置初始值 涉及到VUE的數據流
        props.content && editor.txt.html(props.content)

        editor.config.onchange = (newHtml) => {            // JS 语法
            // editor changed
            console.log('content', newHtml)
            // 子傳父
            emit("event", newHtml)
        }
    })


</script>


