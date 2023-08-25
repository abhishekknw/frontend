import { useEffect, useState } from 'react';
import { useFetchWrapper } from '../../../Dashboards/_helpers/fetch-wrapper';
import { ANG_APIS } from '../../api.constants';

export default function Images() {
  const fetchWrapper = useFetchWrapper();
  const errorMsg = false;
  const [image, setImage] = useState();
  const [tag, setTag] = useState();

  const getImages = () => {
    fetchWrapper.get(ANG_APIS.GET_IMAGE_MAPPING).then((res) => {
      setImage(res.data);
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="uploadImageBox" ng-app="fileUpload" ng-controller="ImagesCtrl">
      <div className="uploadBox">
        <button
          type="file"
          className="submit-btn"
          ngf-select="uploadFiles($files, $invalidFiles)"
          multiple
          accept="image/*"
          ngf-max-height="5000"
          ngf-max-size="7MB"
          ngf-resize="{width: 600, height: 400}"
          ngf-fix-orientation=" true"
        >
          Select Society Image
        </button>
      </div>
      <div className="imageSection">
        <div className="repeatBox" ng-repeat="image in images track by $index">
          <div className="imageBox">
            <div className="image">
              <span className="close removeImage" ng-click="removeImage(image)">
                &times;
              </span>
              <div style={{ width: '300px', height: '200px' }}>
                <img
                  ng-src="{{ImageBaseUrl + image?.image_url}}"
                  style={{ width: '200px', height: '100%', display: 'block' }}
                />
              </div>
            </div>
            <p className="type">
              <strong>Image Type:</strong> {image?.name}
            </p>
            <p className="comments" ng-if="image?.comments!= null">
              <strong>Comments:</strong> {image?.comments}
            </p>
            <div className="fieldbox">
              <textarea
                type="text"
                className="field"
                id="commentupdate_id_{{$index}}"
                name="commentupdate_{{$index}}"
                ng-model="image?.comments"
                placeholder="Add/Update Comment"
              ></textarea>
              <div>
                <select className="field" ng-model="image?.name">
                  <option value="" disabled="true">
                    Select Image Tag
                  </option>
                  <option ng-repeat="tag in tags" value="{{tag?.name}}">
                    {tag?.name}
                  </option>
                </select>
              </div>
              <button type="button" className="smallBtn" ng-click="addcomment(image)">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ font: 'smaller' }}>
        {/* <span className="progress" ng-show="f.progress >= 0">
                    <div style="width:{{f.progress}}%" ng-bind="f.progress + '%'"></div>
                </span> */}
      </div>
      {{ errorMsg }}
    </div>
  );
}
