<script lang="ts" setup>
import { View } from "@nativescript/core"
import { transactions, HEIGH_CARD } from "~/data";
import { ListItem, Transaction, Card as CardType } from "~/types";
import Card from "./Card.vue"
import { PropType } from "nativescript-vue";

const { index, card } = defineProps({
  index: Number, card: {
    type: Object as PropType<CardType>,
    required: true
  }
});

function loadedItemList(args: any, index: number) {
  const itemView: View = args.object;
  itemView.translateY = 200;
  itemView.opacity = 0;
  setTimeout(() => {
    itemView.animate({
      opacity: 1,
      translate: {
        y: 0,
        x: 0
      },
      delay: index * 40
    })
  }, 0);
}
</script>

<template>
  <Page actionBarHidden="true" class="bg-white rounded-t-3xl">
    <GridLayout rows="auto, *" class="pt-2" :style="{ background: card.bg.split(',1)').join(',0.2)') }">
      <StackLayout class="mt-2">
        <Card :sharedTransitionTag="`card_${index}`" :height="HEIGH_CARD" :data="card"></Card>
      </StackLayout>
      <ContentView row="1" class="rounded-t-3xl mt-4">
        <ListView :items="transactions" separatorColor="transparent" class="bg-transparent">
          <template #default="{ item, index }: ListItem<Transaction>">
            <FlexboxLayout class=" justify-between py-1 px-2" @loaded="loadedItemList($event, index)">
              <FlexboxLayout class="items-center">
                <Image :src="item.image" height="55"></Image>
                <FlexboxLayout class="flex-col ml-4">
                  <Label :text="item.title" class="text-black" />
                  <Label :text="item.subTitle" class="text-black text-sm" />
                </FlexboxLayout>
              </FlexboxLayout>
              <FlexboxLayout class="flex-col items-center justify-center">
                <Label :text="`$${item.price}`" class=" text-sm" />
                <Label text="4/12/2023" class="text-xs " />
              </FlexboxLayout>
            </FlexboxLayout>
          </template>
        </ListView>
      </ContentView>
    </GridLayout>
  </Page>
</template>
