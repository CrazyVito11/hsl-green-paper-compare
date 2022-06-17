<template>
    <div class="flex min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
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

            <alert
                v-if="hasMultipleMasters"
                title="Warning"
            >
                <p>You have marked multiple green papers as Master, only the last one will be used as Master.</p>
            </alert>

            <div class="flex w-full max-w-full">
                <green-paper
                    v-for="(greenPaper, greenPaperIndex) in greenPapers"
                    :key="greenPaperIndex"
                    :green-paper-prop="greenPaper"
                    :mismatched-indexes="conflicts[greenPaperIndex]"
                    @new-name="greenPapers[greenPaperIndex].name = $event"
                    @new-marked-as-master="greenPapers[greenPaperIndex].markedAsMaster = $event"
                    @remove="greenPapers.splice(greenPaperIndex, 1)"
                    class="flex flex-col flex-grow"
                ></green-paper>
            </div>
        </div>
    </div>
</template>

<script>
import GreenPaper from './components/GreenPaper.vue';
import { computed, ref, watch } from "vue";
import Alert from "@/components/Alert";

export default {
    name: 'App',
    components: {
        Alert,
        GreenPaper
    },
    setup() {
        const greenPapers = ref([]);
        const initialData = new URL(window.location.href).searchParams.get("l");

        const addGreenPaper = () => {
            greenPapers.value.push({
                name: `User #${greenPapers.value.length + 1}`,
                markedAsMaster: false,
                answers: []
            });
        };

        const conflicts = computed(() => {
            let masterGreenPaperIndex  = 0;
            let masterGreenPaper       = greenPapers.value[masterGreenPaperIndex];
            let shouldActAsMaster      = false;
            let allGreenPaperConflicts = [];

            // Search for the master green paper (if any)
            greenPapers.value.forEach((greenPaper, greenPaperIndex) => {
                if (greenPaper.markedAsMaster) {
                    masterGreenPaperIndex = greenPaperIndex;
                    masterGreenPaper      = greenPapers.value[masterGreenPaperIndex];
                    shouldActAsMaster     = true;
                }
            });

            greenPapers.value.forEach((greenPaper, greenPaperIndex) => {
                let greenPaperConflicts = [];

                masterGreenPaper.answers.forEach((answer, answerIndex) => {
                    let conflict = false;

                    if (shouldActAsMaster) {
                        // Only test against the master green paper, if it's not currently checking the master green paper

                        if (answer !== greenPaper.answers[answerIndex] && masterGreenPaperIndex !== greenPaperIndex) {
                            conflict = true;
                        }
                    } else {
                        // General search for conflicts

                        greenPapers.value.forEach((greenPaperToCheck) => {
                            if (answer !== greenPaperToCheck.answers[answerIndex]) {
                                conflict = true;
                            }
                        });
                    }

                    if (conflict) {
                        greenPaperConflicts.push(answerIndex);
                    }
                });

                allGreenPaperConflicts[greenPaperIndex] = greenPaperConflicts;
            })

            return allGreenPaperConflicts;
        });

        const hasMultipleMasters = computed(() => {
            let hasMaster = false;
            let hasMultiple = false;

            greenPapers.value.forEach((greenPaper) => {
                if (greenPaper.markedAsMaster) {
                    if (hasMaster) {
                        hasMultiple = true;
                    }

                    hasMaster = true;
                }
            });

            return hasMultiple;
        });

        const updateUrl = () => {
            const queryParams = {
                l: JSON.stringify(greenPapers.value.map((greenPaper) => {
                    return {
                        n: greenPaper.name,
                        m: greenPaper.markedAsMaster,
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
                    markedAsMaster: greenPaper.m,
                    answers: greenPaper.a ? greenPaper.a.split("_") : []
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
            conflicts,
            hasMultipleMasters
        };
    }
};
</script>
