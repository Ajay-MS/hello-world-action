import * as core from '@actions/core';
import { SET_FEATURE_FLAG } from './basePath';
import { FeatureFlagsAPI } from './FeatureFlag'

async function run() {
  try {
    const actionType = core.getInput('action-type');
    const projectId = core.getInput('project-id');

    if (actionType == SET_FEATURE_FLAG) {

      let selectedFeatureFlag = await getFeatureFlag(projectId);

      console.log(selectedFeatureFlag);

      const condition = core.getInput('feature-flag-condition');

      if (condition) {
        let conditionList = condition.split(',');

        let extraInput: any[] = [];
        conditionList.forEach(str => {
          extraInput.push({
              "namespace": "http://schemas.microsoft.com/azure/featureflags/orchestrator/conditions",
              "data": str
          });
        });

        selectedFeatureFlag['state']['extra'] = extraInput;
      }

    }  else {
        console.log(`Hello ${projectId}!`);

        

        console.log(process.env.GITHUB_REPOSITORY);

        core.setOutput("featureFlags", "");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getFeatureFlag(projectId: string) {
      const featureFlagName = core.getInput('feature-flag-name');
      let featureFlags = await FeatureFlagsAPI.fetchFeatureFlags(projectId);

      console.log("In main method");
      console.log(featureFlags)

      let selectedFeatureFlag: any = null;
      featureFlags.array.forEach((element: any) => {
        if (element.name.toUpperCase() == featureFlagName.toUpperCase()) {
          selectedFeatureFlag = element;
        }
      });

      if (selectedFeatureFlag == null) {
        throw "Feature flag not defined : " + featureFlagName;
      }

      return selectedFeatureFlag;
}

run();