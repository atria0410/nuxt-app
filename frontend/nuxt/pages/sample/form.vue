<template>
  <v-form ref="formRef">
    <v-row>
      <v-col>
        <v-text-field
          v-model="textFieldValue"
          :rules="rules.textField"
          label="テキストフィールド"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea v-model="textareaValue" :rules="rules.textarea" label="テキストエリア" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="selectValue"
          :items="selectBoxItems"
          :rules="rules.select"
          label="セレクトボックス"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="autocompleteValue"
          :items="autocompleteItems"
          label="オートコンプリート"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-file-input v-model="fileInputValue" label="ファイル" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-checkbox v-model="checkboxValue" label="チェックボックス" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-switch v-model="switchValue" label="スイッチ" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group v-model="radioValue" inline>
          <v-radio label="ラジオボタン１" value="1" />
          <v-radio label="ラジオボタン２" value="2" class="ml-2" />
          <v-radio label="ラジオボタン３" value="3" class="ml-2" />
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-slider v-model="sliderValue" label="スライダー" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="success" block @click="submit">登録</v-btn>
      </v-col>
      <v-col>
        <v-btn color="error" block @click="resetForm">入力リセット</v-btn>
      </v-col>
      <v-col>
        <v-btn color="warning" block @click="resetValidation">バリデーションリセット</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
const formRef = ref(null)
const textFieldValue = ref<string>('')
const textareaValue = ref<string>('')
const selectValue = ref<string>('')
const autocompleteValue = ref<string>('')
const fileInputValue = ref<File>(undefined)
const checkboxValue = ref<boolean>(false)
const switchValue = ref<boolean>(false)
const radioValue = ref<string>('1')
const sliderValue = ref<number>(0)

const selectBoxItems = ['りんご', 'ぶどう', 'バナナ', 'オレンジ', 'パイナップル']
const autocompleteItems = ['りんご', 'ぶどう', 'バナナ', 'オレンジ', 'パイナップル']

// バリデーションルール
const rules = {
  textField: [
    (value) => {
      if (!value) return '必須項目です。'
      return true
    }
  ],
  textarea: [
    (value) => {
      if (!value) return '必須項目です。'
      return true
    }
  ],
  select: [
    (value) => {
      if (!value) return '必須項目です。'
      return true
    }
  ]
}

/**
 * 登録
 */
const submit = async () => {
  const { valid } = await formRef.value.validate()

  if (!valid) return

  const values = {
    textField: textFieldValue.value,
    textarea: textareaValue.value,
    select: selectValue.value,
    autocomplete: autocompleteValue.value,
    fileInput: fileInputValue.value,
    checkbox: checkboxValue.value,
    switch: switchValue.value,
    radio: radioValue.value,
    slider: sliderValue.value
  }

  alert(JSON.stringify(values))
}

/**
 * 入力リセット
 */
const resetForm = () => {
  formRef.value.reset()
}

/**
 * バリデーションリセット
 */
const resetValidation = () => {
  formRef.value.resetValidation()
}
</script>
