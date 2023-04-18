<script lang="ts" setup>
import {
  ref,
  $navigateTo,
  $showModal,
  toRaw,
} from "nativescript-vue";
import { HEIGH_CARD, dataCards } from "@/data"
import { isAndroid, PageTransition, SharedTransition, View, ModalTransition, Screen } from "@nativescript/core";
import { animateView, configHomeSharedTransition } from "~/animation";
import Card from "./Card.vue";
import Details from "./Details.vue";

const isOpen = ref(false);
const refShowBtn = ref();
const refAddBtn = ref();
const refTextHeader = ref();

const transaleY = 70;
const viewCards: View[] = []

function loadedCard(args: any, index: number) {
  const card: View = args.object;
  if (!isOpen.value && viewCards.length < dataCards.length) {
    viewCards.push(card)
    card.translateY = -(HEIGH_CARD - transaleY) * index;
  }
}

function toggleStatus() {
  const showBtn: View = toRaw(refShowBtn.value.nativeView);
  const addBtn: View = toRaw(refAddBtn.value.nativeView);
  const textHeader: View = toRaw(refTextHeader.value.nativeView);

  if (isOpen.value) {
    viewCards.forEach((cardView, index) => index == 0 || close(cardView, index));
    animateView(addBtn, { translate: { y: 0, x: 0 }, alpha: 1, rotation: 0 });
    animateView(addBtn.getViewById("icon-add"), { rotation: 0 });
    animateView(showBtn, { rotation: 90, alpha: 0 });
    animateView(textHeader, { translate: { x: 0, y: 0 } })
  } else {
    viewCards.forEach((cardView) => open(cardView));
    animateView(addBtn, { translate: { y: 50, x: 0 }, alpha: 0 });
    animateView(addBtn.getViewById("icon-add"), { rotation: 180 });
    animateView(showBtn, { rotation: 0, alpha: 1 });
    animateView(textHeader, { translate: { x: -(Screen.mainScreen.widthDIPs / 2) + (textHeader.getActualSize().width / 2) + 10, y: 0 } });
  }
  isOpen.value = !isOpen.value;
}

function open(cardView: View) {
  animateView(cardView, { translate: { x: 0, y: 0 } });
}

function close(cardView: View, index: number) {
  animateView(cardView, { translate: { x: 0, y: -(HEIGH_CARD - transaleY) * index } })
}

function openOrGoToDetails(index: number) {
  if (isOpen.value) {
    if (isAndroid) {
      $navigateTo(Details, {
        transition: SharedTransition.custom(new PageTransition(), configHomeSharedTransition),
        props: { index, card: dataCards[index] }
      });
    } else {
      $showModal(Details, {
        transition: SharedTransition.custom(new ModalTransition(), configHomeSharedTransition),
        props: { index, card: dataCards[index] }
      });
    }
  } else {
    toggleStatus();
  }
}
</script>

<template>
  <Frame>
    <Page actionBarHidden="true" androidStatusBarBackground="transparent" class="bg-white">
      <GridLayout>
        <StackLayout class="h-full" verticalAlignment="top">
          <GridLayout height="50" class="android:mt-3">
            <Label ref="refTextHeader" text="Wallet" class="text-3xl font-bold text-black"
              horizontalAlignment="center"></Label>
            <Label ref="refShowBtn" text="close" style="font-size: 24;" height="45" width="45" rotate="90"
              class="m-icon-round bg-[#0666eb] rounded-full text-white text-center opacity-0 mr-2"
              horizontalAlignment="right" @tap="toggleStatus"></Label>
          </GridLayout>
          <FlexboxLayout class="mt-2 h-full flex-col">
            <Card v-for="(card, index) in dataCards" :key="index" :style="{ 'height': HEIGH_CARD }" :data="card"
              :sharedTransitionTag="`card_${index}`" @loaded="loadedCard($event, index)" @tap="openOrGoToDetails(index)">
            </Card>
          </FlexboxLayout>
        </StackLayout>
        <FlexboxLayout ref="refAddBtn" verticalAlignment="bottom" class="justify-center items-center" height="100">
          <Label id="icon-add" text="add" height="60" width="60"
            class="m-icon-round bg-[#0666eb] text-center text-white rounded-xl"></Label>
        </FlexboxLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>