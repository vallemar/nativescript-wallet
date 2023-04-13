<script lang="ts" setup>
import {
  ref,
  $navigateTo,
  $showModal,
  toRaw,
} from "nativescript-vue";
import { dataCards } from "@/data"
import { CoreTypes, isAndroid, PageTransition, SharedTransition, View, ModalTransition, Utils } from "@nativescript/core";
import { configHomeSharedTransition } from "~/animation";
import Details from "./Details.vue";

const isOpen = ref(false);
const refShowBtn = ref();
const refAddBtn = ref();

const heightCard = 200;
const transaleY = 70;
const viewCards: View[] = []

function loadedCard(args: any, index: number) {
  const card: View = args.object;
  if (!isOpen.value) {
    viewCards.push(card)
    
     card.translateY = -(heightCard - transaleY) * index;
  }
}

function toggleStatus() {
  const showBtn: View = toRaw(refShowBtn.value.nativeView);
  const addBtn: View = toRaw(refAddBtn.value.nativeView);

  if (isOpen.value) {
    viewCards.forEach((cardView, index) => index == 0 || close(cardView, index));
    changeOpacity(showBtn, 0, { rotate: 90 });
    changeOpacity(addBtn, 1, { translate: { y: 0, x: 0 } });
  } else {
    viewCards.forEach((cardView, index) => open(cardView, index));
    changeOpacity(showBtn, 1, { rotate: 0 });
    changeOpacity(addBtn, 0, { translate: { y: 100, x: 0 } });
  }
  isOpen.value = !isOpen.value;
}

function close(cardView: View, index: number) {
  /* cardView.animate({
    translate: { x: 0, y: -(heightCard - 50) * index },
    curve: CoreTypes.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1),
    duration: 250
  }); */
  if (isAndroid) {
    const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(
      cardView.android,
      androidx.dynamicanimation.animation.DynamicAnimation.TRANSLATION_Y,
      Utils.layout.toDevicePixels(-(heightCard - transaleY) * index)
    );

    springAnim.getSpring().setStiffness(200)
    springAnim.getSpring().setDampingRatio(0.6);
    springAnim.start();
  } else {
    Utils.ios.animateWithSpring({
      animations: () => {
        (<UIView>cardView.ios).transform = CGAffineTransformMakeTranslation(0.0, -(heightCard - transaleY) * index)
      }
    });
  }
}

function open(cardView: View, index: number) {
  /* cardView.animate({
    translate: { x: 0, y: 0 },
    curve: CoreTypes.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1),
    duration: 250
  }); */

  if (isAndroid) {
    const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(
      cardView.android, androidx.dynamicanimation.animation.DynamicAnimation.TRANSLATION_Y, 0
    );
    springAnim.getSpring().setStiffness(200)
    springAnim.getSpring().setDampingRatio(0.6);
    springAnim.start();
  } else {
    Utils.ios.animateWithSpring({
      animations: () => {
        (<UIView>cardView.ios).transform = CGAffineTransformMakeTranslation(0.0, 0)
      }
    });
  }
}

function changeOpacity(view: View, opacity: number, animateOptions?: any) {
  view.animate({
    ...animateOptions,
    opacity: opacity,
    duration: 250
  })
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
    <Page actionBarHidden="true" androidStatusBarBackground="transparent" statusbar>
      <GridLayout>
        <StackLayout class="p-2 h-full" verticalAlignment="top">
          <GridLayout height="50">
            <Label text="Wallet" class="text-2xl font-bold text-black" horizontalAlignment="center"></Label>
            <Label ref="refShowBtn" text="close" style="font-size: 24;" height="45" width="45" rotate="90"
              class="m-icon-round bg-[#0666eb] rounded-full text-white text-center opacity-0" horizontalAlignment="right"
              @tap="toggleStatus"></Label>
          </GridLayout>
          <StackLayout class="mt-2 h-full">
            <FlexboxLayout v-for="(card, index) in dataCards" :key="index" :sharedTransitionTag="'card_' + index"
              :style="{ 'background': card.bg, 'height': heightCard }" @loaded="loadedCard($event, index)"
              @tap="openOrGoToDetails(index)" class="flex-col p-3 justify-between rounded-lg mt-2">
              <FlexboxLayout class="justify-between">
                <Label text="Credit" class="text-xl font-bold text-white"></Label>
                <Image :src="card.imgType" height="45"></Image>
              </FlexboxLayout>
              <FlexboxLayout class="flex-col">
                <Label text="Hewad" class="text-xl text-white"></Label>
                <Label text="**** **** 2222" class="text-xl text-white"></Label>
              </FlexboxLayout>
            </FlexboxLayout>
          </StackLayout>
        </StackLayout>
        <FlexboxLayout ref="refAddBtn" verticalAlignment="bottom" class=" justify-center">
          <Label text="add" height="50" width="100"
            class="m-icon-round bg-[#0666eb] text-center text-white rounded-xl mb-4"></Label>
        </FlexboxLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>