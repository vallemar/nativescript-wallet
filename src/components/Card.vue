<script lang="ts" setup>
import { PropType } from "nativescript-vue";
import { Card } from "~/types";

const props = defineProps({
    data: {
        type: Object as PropType<Card>,
        required: true
    }
})
</script>

<template>
    <GridLayout class="p-2">
        <ContentView width="100%" class="rounded-lg h-full" ios:boxShadow="0 0 3 3 rgba(0,0,0,.42)"></ContentView>
        <FlexboxLayout android:boxShadow="0 0 3 3 rgba(0,0,0,.12)" :style="{ 'background': props.data.bg }" class="flex-col p-3 justify-between rounded-lg h-full">
            <FlexboxLayout class="justify-between">
                <Label text="Credit" class="text-xl font-bold text-white"></Label>
                <Image :src="props.data.imgType" height="45"></Image>
            </FlexboxLayout>
            <FlexboxLayout class="flex-col">
                <Label :text="data.name" class="text-xl text-white"></Label>
                <Label :text="data.number" class="text-lg text-white"></Label>
            </FlexboxLayout>
        </FlexboxLayout>
    </GridLayout>
</template>