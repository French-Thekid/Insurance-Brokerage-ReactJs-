import { nanoid } from 'nanoid'

export class WorkflowBuilder {
  #model = {
    name: 'New Workflow',
    createdAt: Date.now(),
    id: nanoid(),
    description: '',
    steps: [],
  }

  Details = {
    /**
     * returns the model details as an object
     */
    get: () => {
      return {
        id: this.#model.id,
        name: this.#model.name,
        createdAt: this.#model.createdAt,
        description: this.#model.description,
      }
    },
    /**
     * Mutate the details object with a new model object
     * @param {object} detailsObject - object to overide details with
     */
    set: (detailsObject) => {
      this.#model = { ...this.#model, ...detailsObject }
    },
  }

  Step = {
    /**
     * Set or update the step array
     * @param {array} arr - arr to mutate step array with
     */
    setAll: (arr) => {
      this.#model.steps = arr
    },

    /**
     * Get the step array
     */
    getAll: () => {
      return this.#model.steps
    },

    /**
     * Create data describing a step object
     * @param {string} stepType - Type of step to create
     * @param {object} stepData - Step object with details of the step
     */
    make: (stepType, stepData) => {
      let data = {}
      switch (stepType) {
        case 'ACCOUNT_CREATE':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'ACCOUNT_EDIT':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'ACCOUNT':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'EVENT':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'EMAIL':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'EMAIL_CREATE':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'NOTE':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'SLIP':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'POLICY':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'CREATE_POLICY':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'POLICY_LIMIT':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'POLICY_EXTENSION':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'POLICY_RISK':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'POLICY_MOTOR_RISK':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'APPROVER':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'NOTIFICATION':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'INSURERS':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        case 'INSURERS_CREATE':
          data = { id: nanoid(12), ...stepData, stepType }
          this.#model.steps.push(data)
          return data
        default:
          return null
      }
    },

    /**
     * Updates a step by replacing its data
     * @param {string} stepId - Id of the step to select
     * @param {object} newData - Object to update step with, should contain the id aswell
     */
    update: (stepId, newData) => {
      let step = this.Util.stepDetails(stepId)
      this.#model.steps[step.details.index] = newData
    },

    /**
     * clear all steps
     */
    clearAll: () => {
      this.#model.steps = []
      return this.#model.steps
    },

    /**
     * Move a step up or down
     * @param {string} stepId - Id of step to move
     * @param {string} direction - where to move step defaults to down
     */
    move: (stepId, direction = 'DOWN') => {
      let step = this.Util.stepDetails(stepId)
      let atr
      direction === 'UP' ? (atr = 'previousIndex') : (atr = 'nextIndex')

      if (step.details[atr] !== null) {
        this.Step.setAll(
          this.Util.moveArrayEntry(
            this.Step.getAll(),
            step.details.index,
            step.details[atr]
          )
        )
      }
    },

    /**
     * Remove a step
     * @param {string} stepId - Id of step to delete
     */
    delete: (stepId) => {
      let step = this.Util.stepDetails(stepId)
      let index = step.details.index
      this.#model.steps.splice(index, 1)
    },

    addOption: (stepId, data) => {
      let step = this.Util.stepDetails(stepId).step[0]
      if (step.options) {
        step.options.push(data)
      } else {
        step.options = []
        step.options.push(data)
      }
      return this.#model.steps
    },
  }

  Util = {
    /**
     * find a step object from step array
     * @param {array} arr - array containing objects
     * @param {string} atr - attribute to select
     * @param {any} value - value to check for on attribute
     */
    selectStep: (arr, atr, value) => {
      var result = arr.filter((obj) => {
        return obj[atr] === value
      })
      return result
    },

    /**
     * information about a step's index
     * @param {array} array - array to search
     * @param {string} index - Index of element to return information about
     */
    indexDetails: (array, index) => {
      let details = {}
      details.length = array.length
      details.index = index
      details.lastIndex = array.length - 1
      if (index === 0) {
        details.previousIndex = null
      } else if (index === details.lastIndex && array.length > 1) {
        details.previousIndex = index - 1
      } else {
        details.previousIndex = index - 1
      }
      if (index === details.lastIndex) {
        details.nextIndex = null
      } else if (index === 0 && array.length > 1) {
        details.nextIndex = index + 1
      } else {
        details.nextIndex = index + 1
      }
      return details
    },

    /**
     * Move an array item using indexes
     * @param {array} arr - array containing values to be moved
     * @param {number} old_index - the original index of array item
     * @param {number} new_index - target index to move array item to
     */
    moveArrayEntry: (arr, old_index, new_index) => {
      while (old_index < 0) {
        old_index += arr.length
      }
      while (new_index < 0) {
        new_index += arr.length
      }
      if (new_index >= arr.length) {
        let k = new_index - arr.length
        while (k-- + 1) {
          arr.push(undefined)
        }
      }

      arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
      return arr
    },

    /**
     * Return information about a step
     * @param {string} stepId - id of step to query
     */
    stepDetails: (stepId) => {
      let steps = this.Step.getAll()
      let selectedStep = this.Util.selectStep(steps, 'id', stepId)
      let index = steps.indexOf(selectedStep[0])
      let details = this.Util.indexDetails(steps, index)
      return {
        step: selectedStep,
        details: details,
      }
    },
  }

  /**
   * Load an existing workflow schema object
   * @param {object} workflow - object to be loaded
   */
  load(workflow) {
    this.#model = { ...this.#model, ...workflow }
    return this
  }

  get() {
    return this.#model
  }
}
