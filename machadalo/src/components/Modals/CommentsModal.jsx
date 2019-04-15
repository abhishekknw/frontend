import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import moment from 'moment';

import './index.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const CommentTypes = [
  { label: 'Internal', value: 'INTERNAL' },
  { label: 'External', value: 'EXTERNAL' }
];

// Get comment type option from string
const getCommentTypeOption = value => {
  for (let i = 0, l = CommentTypes.length; i < l; i += 1) {
    if (CommentTypes[i].value === value) {
      return CommentTypes[i];
    }
  }

  return { value };
};

export default class CommentsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'INTERNAL',
      comment: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderCommentRow = this.renderCommentRow.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onCommentAdd = this.onCommentAdd.bind(this);
  }

  onTypeChange(option) {
    this.setState({
      type: option.value
    });
  }

  onCommentAdd(event) {
    event.preventDefault();

    const { comments, onChange, user } = this.props;
    const { comment, type } = this.state;

    if (!comments[type]) comments[type] = [];

    comments[type].push({
      comment,
      timestamp: moment().valueOf(),
      user_id: user.id
    });

    onChange(comments);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // handleCommentRemove(index) {
  //   const options = [...this.state.options];

  //   options.splice(index, 1);

  //   if (!options.length) {
  //     options.push('');
  //   }

  //   this.setState({
  //     options
  //   });
  // }

  renderCommentRow(comment, index) {
    const onRemove = () => {
      // this.handleCommentRemove(index);
    };

    return (
      <div className="form-control option" key={index}>
        <p>{comment.comment}</p>
        <p>{comment.timestamp}</p>
        <div className="option__actions">
          <button type="button" className="btn btn--link" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { isVisible, comments, onClose } = this.props;
    const { type, comment } = this.state;

    const commentsList = [
      ...(comments.internal || []),
      ...(comments.external || [])
    ];

    return (
      <Modal isOpen={isVisible} style={customStyles} ariaHideApp={false}>
        <div className="modal modal-comments">
          <div className="modal__header">
            <h3>Comments</h3>
          </div>
          <div className="modal__body">
            {commentsList.length ? (
              commentsList.map(this.renderCommentRow)
            ) : (
              <p>No comments yet</p>
            )}

            <div className="modal-comments__add">
              <h5>Add comment</h5>
              <form onSubmit={this.onCommentAdd}>
                <Select
                  className="select"
                  options={CommentTypes}
                  value={getCommentTypeOption(type)}
                  onChange={this.onTypeChange}
                />
                <input
                  type="text"
                  name="comment"
                  placeholder="Type something here..."
                  value={comment}
                  onChange={this.handleInputChange}
                />
                <button type="submit" className="btn btn--danger">
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="modal__footer">
            <button type="button" className="btn btn--danger" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
