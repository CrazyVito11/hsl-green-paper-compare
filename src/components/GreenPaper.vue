<template>
    <div class="">
        <div class="flex flex-col mb-4">
            <a href="#" @click="handleRemoveButton" class="text-red-500 ml-auto">x</a>

            <input type="text" class="bg-transparent text-center text-2xl dark:text-white" v-model="name">
            <h3 class="text-center text-gray-400 dark:text-gray-200">
                {{ answers.length }} /
                <span
                    :class="{ 'text-red-500': mismatchedIndexes.length > 0, 'text-black': mismatchedIndexes.length === 0 }"
                >
                    {{ mismatchedIndexes.length }}
                </span>
            </h3>

            <input
                type="text"
                v-model="answerInput"
                @input="handleAnswerInput"
                placeholder="Input answer"
                class="text-center w-1/2 mx-auto rounded mt-2 dark:bg-gray-400 dark:text-white dark:placeholder-gray-200"
            >
        </div>

        <div class="flex flex-col dark:bg-gray-300">
            <div
                v-for="(answer, answerIndex) in answers"
                :key="answerIndex"
                class="w-full flex"
                :class="{ 'bg-gray-100 dark:bg-gray-400': answerIndex % 2 === 0 && ! mismatchedIndexes.includes(answerIndex), 'bg-red-100 dark:bg-red-500': mismatchedIndexes.includes(answerIndex) }"
            >
                <div class="shrink-0 px-2">
                    <p v-text="answerIndex + 1"></p>
                </div>
                <div class="flex-grow">
                    <input class="bg-transparent w-full" type="text" v-model="answers[answerIndex]" maxlength="1">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
    name: 'GreenPaper',
    props: {
        greenPaperProp: {
            type: Object,
            required: true
        },
        mismatchedIndexes: {
            type: Array,
            required: true,
        }
    },
    emits: ["new-name", "remove"],
    components: {},
    setup(props, { emit }) {
        const name        = ref("");
        const answers     = ref([]);
        const answerInput = ref("");

        const handleAnswerInput = (event) => {
            const allowedValues = ["A", "B", "C", "D", "E", "F"];

            if (!allowedValues.includes(event.data.toUpperCase())) {
                answerInput.value = "";

                return;
            }

            answers.value.push(event.data.toUpperCase());
            answerInput.value = "";
        };

        const handleRemoveButton = () => {
            if (!confirm(`Are you sure you want to remove ${name.value}?`)) {
                return;
            }

            emit("remove");
        };

        watch(
            () => props.greenPaperProp,
            (greenPaperData) => {
                name.value    = greenPaperData.name;
                answers.value = greenPaperData.answers;
            },
            {
                immediate: true
            }
        );

        watch(
            () => name.value,
            (newName) => {
                emit("new-name", newName);
            }
        );

        return {
            name,
            answers,
            answerInput,
            handleAnswerInput,
            handleRemoveButton
        };
    }
};
</script>
