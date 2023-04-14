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
import Card from "./Card.vue";
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
    viewCards.forEach((cardView, index) => open(cardView));
    changeOpacity(showBtn, 1, { rotate: 0 });
    changeOpacity(addBtn, 0, { translate: { y: 100, x: 0 } });
  }
  isOpen.value = !isOpen.value;
}

function open(cardView: View) {
  if (isAndroid) {
    animateAndroid(cardView, 0);
  } else {
    animateIOS(cardView, 0);
  }
}

function close(cardView: View, index: number) {
  if (isAndroid) {
    animateAndroid(cardView, -(heightCard - transaleY) * index);
  } else {
    animateIOS(cardView, -(heightCard - transaleY) * index);
  }
}

function animateAndroid(view: View, position: number) {
  if ((global as any).isAppRunInPreview) {
    view.animate({
      translate: { x: 0, y: position },
      curve: CoreTypes.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1),
      duration: 250
    });
  } else {
    const springAnim = new androidx.dynamicanimation.animation.SpringAnimation(
      view.android, androidx.dynamicanimation.animation.DynamicAnimation.TRANSLATION_Y,
      Utils.layout.toDevicePixels(position)
    );
    springAnim.getSpring().setStiffness(150);
    springAnim.getSpring().setDampingRatio(0.6);
    springAnim.start();
  }
}

function animateIOS(view: View, position: number) {
  Utils.ios.animateWithSpring({
    animations: () => {
      (<UIView>view.ios).transform = CGAffineTransformMakeTranslation(0.0, position)
    }
  });
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
    <Page actionBarHidden="true" androidStatusBarBackground="transparent">
      <GridLayout>
        <StackLayout class="h-full" verticalAlignment="top">
          <GridLayout height="50" class="px-2">
            <Label text="Wallet" class="text-2xl font-bold text-black" horizontalAlignment="center"></Label>
            <Label ref="refShowBtn" text="close" style="font-size: 24;" height="45" width="45" rotate="90"
              class="m-icon-round bg-[#0666eb] rounded-full text-white text-center opacity-0" horizontalAlignment="right"
              @tap="toggleStatus"></Label>
          </GridLayout>
          <FlexboxLayout class="mt-2 h-full flex-col">
            <Card v-for="(card, index) in dataCards" :key="index" :style="{ 'height': heightCard }" :data="card"
              @loaded="loadedCard($event, index)" @tap="openOrGoToDetails(index)">
            </Card>
          </FlexboxLayout>
        </StackLayout>
        <FlexboxLayout ref="refAddBtn" verticalAlignment="bottom" class=" justify-center">
          <Label text="add" height="50" width="100"
            class="m-icon-round bg-[#0666eb] text-center text-white rounded-xl mb-4"></Label>
        </FlexboxLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>