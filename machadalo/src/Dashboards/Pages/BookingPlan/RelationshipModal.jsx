import React from 'react';

export default function RelationshipModal() {
  return (
  <>
    <div className='rdiv'> 
      <ul>
        <li><h4 className='relationhead'>Supply Owner / Representative</h4></li>
        <li className='relationdata'></li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Feedback About Supplier</h4></li>
        <li className='relationdata'>Not Given</li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Last Campaign Price With Name	</h4></li>
        <li className='relationdata'>-</li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Last Campaign Price per unit </h4></li>
        <li className='relationdata'></li>
      </ul>
      <ul>
        <li><h4 className='relationhead'>Count Of Previous Campaigns</h4></li>
        <li className='relationdata'>0</li>
      </ul>


    </div>
  </>
  );
}
