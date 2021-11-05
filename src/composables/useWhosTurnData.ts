import { Plugins } from '@capacitor/core';
import { onMounted, ref, watch } from 'vue';

export interface ReadHistory {
  child: 'Lenni' | 'Lumi';
  history: History[];
}
interface History {
  date: Date;
  reader?: 'Äiti' | 'Isi';
  confirmed: boolean;
}

export function useWhosTurnData() {
  const { Storage } = Plugins;
  const WHOS_TURN_STORAGE = 'whos_turn';
  const readHistory = ref<ReadHistory[]>([]);

  const cacheHistory = () => {
    Storage.set({
      key: WHOS_TURN_STORAGE,
      value: JSON.stringify(readHistory.value),
    });
  };
  watch(readHistory, cacheHistory);

  const createDateStampFromDate = (fromDate: Date, addDays = 0): Date => {
    const currentDate: Date = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate()
    );
    return new Date(currentDate.setDate(currentDate.getDate() + addDays));
  };
  const createMissingHistory = (childNames: string[], currentData: ReadHistory[]) => {
    if (!currentData || currentData.length === 0) {
      currentData.push(
        {
          child: 'Lenni',
          history: [{ confirmed: false, date: createDateStampFromDate(new Date(), -10) }],
        },
        {
          child: 'Lumi',
          history: [{ confirmed: false, date: createDateStampFromDate(new Date(), -10) }],
        }
      );
    }
    childNames.forEach((childName) => {
      let stopWhile = false;
      let i = 0;
      do {
        const r = currentData.filter((readHistory) => readHistory.child === childName)[0];
        const currentHistoryRow = r.history[r.history.length - 1];
        const lastDate = new Date(currentHistoryRow.date);
        i = +1;

        if (lastDate !== createDateStampFromDate(lastDate, 1)) {
          const newHistoryRow: History = {
            date: createDateStampFromDate(lastDate, 1),
            confirmed: false,
          };

          if (currentHistoryRow.reader === 'Äiti') {
            newHistoryRow.reader = 'Isi';
          }
          if (currentHistoryRow.reader === 'Isi') {
            newHistoryRow.reader = 'Äiti';
          }

          r.history.push(newHistoryRow);
        } else {
          stopWhile = true;
        }
      } while (stopWhile);
    });
    return currentData;
  };

  const loadSaved = async () => {
    const readHistoryList = await Storage.get({ key: WHOS_TURN_STORAGE });
    const readHistoryStorage = readHistoryList.value ? JSON.parse(readHistoryList.value) : [];
    createMissingHistory(['Lenni', 'Lumi'], readHistoryStorage);

    readHistory.value = readHistoryStorage;
  };

  onMounted(loadSaved);

  const confirm = async (newReadHistoryItem: ReadHistory) => {
    readHistory.value = [newReadHistoryItem, ...readHistory.value];
  };

  return {
    readHistory,
    confirm,
  };
}
