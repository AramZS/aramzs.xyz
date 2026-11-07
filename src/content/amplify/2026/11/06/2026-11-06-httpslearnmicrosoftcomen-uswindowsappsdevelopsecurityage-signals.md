---
author: GrantMeStrength
cover_image: 'https://learn.microsoft.com/en-us/media/open-graph-image.png'
date: '2026-11-06T19:47:57.273Z'
dateFolder: 2026/11/06
description: >-
  Learn how Windows Age APIs help your app use age-group signals and verified
  adult status without receiving an exact age or date of birth.
isBasedOn: 'https://learn.microsoft.com/en-us/windows/apps/develop/security/age-signals/'
link: 'https://learn.microsoft.com/en-us/windows/apps/develop/security/age-signals/'
slug: 2026-11-06-httpslearnmicrosoftcomen-uswindowsappsdevelopsecurityage-signals
tags: []
title: Age signals overview for Windows developers - Windows apps
---
<p>The Windows Age APIs provide privacy-preserving signals that apps can use to understand the age group and adult-verification status of the signed-in user. The APIs return coarse signals instead of the user's exact age or date of birth. Apps can use these signals to adapt content, features, or access controls and must provide appropriate fallback behavior when a signal is unavailable.</p>
<h2>What are age signals?</h2>
<p>Age signals are values that Windows returns when an app calls the Age APIs for the current user. The app decides when to request the user's age group or adult-verification status to inform the appropriate end-user experience.</p>
<p>Neither signal directly exposes the user's exact age or date of birth. The <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.user.getuseragerangeasync"><code>GetUserAgeRangeAsync</code></a> API provides an age range that the app can use to make content decisions. It offers the following age groups:</p>
<ul> <li>Under 10</li> <li>10-12</li> <li>13-15</li> <li>16-17</li> <li>18+</li> </ul>
<h2>Windows Age APIs</h2>
<h3>GetUserAgeRangeAsync</h3>
<p>The <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.user.getuseragerangeasync"><code>GetUserAgeRangeAsync</code></a> method returns the user’s age range as a <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.useragerange"><code>UserAgeRange</code></a> object with <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.useragerange.lower"><code>Lower</code></a> and <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.useragerange.upper"><code>Upper</code></a> properties.</p>
<p>Expand table</p>
<table data-scrollable-table-init=""> <tr> <th>Age group</th> <th>Return values</th> </tr> <tbody> <tr> <td><strong>Under 10</strong></td> <td>{0, 9}</td> </tr> <tr> <td><strong>10-12</strong></td> <td>{10, 12}</td> </tr> <tr> <td><strong>13-15</strong></td> <td>{13, 15}</td> </tr> <tr> <td><strong>16-17</strong></td> <td>{16, 17}</td> </tr> <tr> <td><strong>18+</strong></td> <td>{18, <code>INT32_MAX</code>}</td> </tr> <tr> <td><strong>Unknown</strong></td> <td><code>null</code></td> </tr> </tbody> </table>
<p>When the result is <code>null</code>, the age range is unknown or unavailable. Apps must use their fallback experience and must not interpret <code>null</code> as a specific age group.</p>
<h3>GetAgeVerificationStatusAsync</h3>
<p>The <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.user.getageverificationstatusasync"><code>GetAgeVerificationStatusAsync</code></a> method returns a <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.userageverificationstatus"><code>UserAgeVerificationStatus</code></a> value indicating the adult-verification status reported for the user. Age verification checks whether a user who claims to be an adult is an adult. It doesn't establish a verified age or verify other age groups.</p>
<p>Possible values are:</p>
<ul> <li><code>Verified</code>: The user has verified adult status.</li> <li><code>Unverified</code>: The user doesn't have verified adult status. This doesn't establish that the user is a minor.</li> <li><code>OptedOut</code>: The user has opted out of adult verification.</li> <li><code>TemporarilyUnavailable</code>: The status cannot currently be determined.</li> <li><code>NotApplicable</code>: Verification does not apply, no verification signal is available, or the feature is unavailable or disabled.</li> </ul>
<p>Apps must handle every value. <code>NotApplicable</code> and <code>TemporarilyUnavailable</code> don't establish whether the user has verified adult status. An age-range result of 18 or older doesn't by itself establish verified adult status.</p>
<h3>Caller authorization and consent</h3>
<p>The app package must declare the <code>userAccountInformation</code> capability. Access to age signals is also subject to the user's consent to let the app access account information in Windows privacy settings. If access isn't granted, the call can fail with <code>E_ACCESSDENIED</code>. The <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.user"><code>User</code></a> object must represent the user running the current process.</p>
<h3>Policy and availability</h3>
<p>When the Age APIs are unavailable or disabled, <code>GetUserAgeRangeAsync</code> returns <code>null</code> and <code>GetAgeVerificationStatusAsync</code> returns <code>NotApplicable</code>. Administrators can also configure a default age group or verification status through Group Policy or MDM; when configured, the APIs return the corresponding policy-defined value. Apps must check that the methods are available before calling them and retain fallback behavior for unavailable signals.</p>
<p>A policy-defined <code>Verified</code> value is an administrative default, not evidence that the user completed the adult-verification flow.</p>
<p>Identity-provider age signals are currently retrieved only for Microsoft accounts. For other account types, when no administrative default is configured, <code>GetUserAgeRangeAsync</code> returns <code>null</code> and <code>GetAgeVerificationStatusAsync</code> returns <code>NotApplicable</code>.</p>
<h2>When to use age signals</h2>
<p>Use age signals when your app:</p>
<ul> <li>Displays user-generated content, social features, or communication tools that may not be appropriate for all ages.</li> <li>Offers in-app purchases or virtual currencies where age restrictions are relevant.</li> <li>Streams or plays media content with maturity ratings.</li> </ul>
<h2>How age signals work at a high level</h2>
<figure><img alt="Diagram showing an app exchanging age-group information with the Digital Safety API local service, which communicates with configuration settings." data-linktype="relative-path" src="https://learn.microsoft.com/en-us/windows/apps/develop/security/age-signals/images/age-process-diagram.png"/></figure>
<h2>Privacy and data handling</h2>
<p>Age signals are designed with privacy as a core principle:</p>
<ul> <li><strong>No exact age or date of birth is returned.</strong> The APIs return an age bucket and an adult-verification status. Adult verification doesn't establish a verified age or verified minor age group.</li> <li><strong>Age groups are generic.</strong> They communicate common age groups for various use cases such as gaming or regional law.</li> </ul>
<h2>Platform requirements</h2>
<p>Expand table</p>
<table data-scrollable-table-init=""> <tr> <th>Requirement</th> <th>Details</th> </tr> <tbody> <tr> <td><strong>Minimum OS version</strong></td> <td>Windows 11</td> </tr> <tr> <td><strong>API surface</strong></td> <td>Windows Runtime methods on <a data-linktype="absolute-path" href="https://learn.microsoft.com/en-us/uwp/api/windows.system.user"><code>Windows.System.User</code></a></td> </tr> <tr> <td><strong>User context</strong></td> <td>Calls apply only to the user running the current process.</td> </tr> <tr> <td><strong>App capability</strong></td> <td>The app package must declare <code>userAccountInformation</code></td> </tr> </tbody> </table>
<h2>See also</h2>
<ul> <li><a data-linktype="relative-path" href="https://learn.microsoft.com/en-us/windows/apps/develop/security/age-signals/faq">Windows Age APIs FAQ</a></li> <li><a data-linktype="external" href="https://www.microsoft.com/microsoft-365/family-safety">Microsoft Family Safety</a></li> <li><a data-linktype="relative-path" href="https://learn.microsoft.com/en-us/windows/apps/develop/security/">Security and identity development for Windows apps</a></li> </ul>
