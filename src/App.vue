<template>
    <div class="flex min-h-screen w-screen bg-gray-100 dark:bg-gray-800 p-4">
        <div class="w-full max-w-[1080px] bg-gray-50 dark:bg-gray-600 border-gray-200 p-4 rounded-md shadow-2xl m-auto">
            <div class="flex mb-4">
                <h1 class="text-2xl dark:text-white">HSL green paper compare</h1>
                <button
                    class="ml-auto bg-green-500 hover:bg-green-600 transition-colors text-white px-2 py-1 rounded"
                    @click="addGreenPaper"
                >
                    Add green paper
                </button>
            </div>
            <div class="flex w-full">
                <green-paper
                    v-for="(greenPaper, greenPaperIndex) in greenPapers"
                    :key="greenPaperIndex"
                    :green-paper-prop="greenPaper"
                    :mismatched-indexes="conflicts"
                    @new-name="greenPapers[greenPaperIndex].name = $event"
                    @remove="greenPapers.splice(greenPaperIndex, 1)"
                    class="flex-grow shrink-0"
                ></green-paper>
            </div>
        </div>
    </div>
</template>

<script>
import GreenPaper from './components/GreenPaper.vue';
import { computed, ref, watch } from "vue";

export default {
    name: 'App',
    components: {
        GreenPaper
    },
    setup() {
        const greenPapers = ref([]);
        const initialData = new URL(window.location.href).searchParams.get("l");

        const addGreenPaper = () => {
            greenPapers.value.push({
                name: `User #${greenPapers.value.length + 1}`,
                answers: []
            });
        };

        const conflicts = computed(() => {
            const greenPaper        = greenPapers.value[0];
            let greenPaperConflicts = [];

            greenPaper.answers.forEach((answer, answerIndex) => {
                let conflict = false;

                greenPapers.value.forEach((greenPaperToCheck) => {
                    if (answer !== greenPaperToCheck.answers[answerIndex]) {
                        conflict = true;
                    }
                });

                if (conflict) {
                    greenPaperConflicts.push(answerIndex);
                }
            });

            return greenPaperConflicts;
        });

        const updateUrl = () => {
            const queryParams = {
                l: JSON.stringify(greenPapers.value.map((greenPaper) => {
                    return {
                        n: greenPaper.name,
                        a: greenPaper.answers.join("_")
                    };
                }))
            };

            window.history.pushState(queryParams, document.title, `${window.location.pathname}?${new URLSearchParams(queryParams).toString()}`);
        }

        if (initialData) {
            // Restore the compare data from the URL
            JSON.parse(initialData).forEach((greenPaper) => {
                greenPapers.value.push({
                    name: greenPaper.n,
                    answers: greenPaper.a.split("_")
                });
            });
        } else {
            // Add 2 empty compares by default
            addGreenPaper();
            addGreenPaper();
        }

        watch(
            () => greenPapers,
            () => {
                updateUrl();
            },
            {
                deep: true
            }
        );

        return {
            greenPapers,
            addGreenPaper,
            conflicts
        };
    }
};
</script>
