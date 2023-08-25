export default function Images() {
  return (
    <div class="uploadImageBox" ng-app="fileUpload" ng-controller="ImagesCtrl">
      <div class="uploadBox">
        <button
          type="file"
          class="submit-btn"
          ngf-select="uploadFiles($files, $invalidFiles)"
          multiple
          accept="image/*"
          ngf-max-height="5000"
          ngf-max-size="7MB"
          ngf-resize="{width: 600, height: 400}"
          ngf-fix-orientation=" true"
        >
          Upload Corporate Image
        </button>
      </div>
      <div class="imageSection">
        <div class="repeatBox" ng-repeat="image in images track by $index">
          <div class="imageBox">
            <div class="image">
              <span class="close removeImage" ng-click="removeImage(image)">
                &times;
              </span>
              <div style="width:300px;height:200px">
                <img
                  ng-src="{{ImageBaseUrl + image.image_url}}"
                  style="width: 200px; height: 100%; display: block;"
                />
              </div>
            </div>
            <p class="type">
              <strong>Image Type:</strong> {image.name}
            </p>
            <p class="comments" ng-if="image.comments!= null">
              <strong>Comments:</strong> {image.comments}
            </p>
            <div class="fieldbox">
              <textarea
                type="text"
                class="field"
                id="commentupdate_id_{{$index}}"
                name="commentupdate_{{$index}}"
                ng-model="image.comments"
                placeholder="Add/Update Comment"
              ></textarea>
              <div>
                <select class="field" ng-model="image.name">
                  <option value="" disabled="true">
                    Select Image Tag
                  </option>
                  <option ng-repeat="tag in tags" value="{{tag.name}}">
                    {tag.name}
                  </option>
                </select>
              </div>
              <button type="button" class="smallBtn" ng-click="addcomment(image)">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style="font:smaller">
        <span class="progress" ng-show="f.progress >= 0">
          <div style="width:{{f.progress}}%" ng-bind="f.progress + '%'"></div>
        </span>
      </div>
      {{ errorMsg }}
    </div>
  );
}
